export var BatterStatus;
(function (BatterStatus) {
    BatterStatus[BatterStatus["OK"] = 0] = "OK";
    BatterStatus[BatterStatus["Low"] = 1] = "Low";
})(BatterStatus || (BatterStatus = {}));
export var PackageType;
(function (PackageType) {
    PackageType["StatusMessage"] = "S";
    PackageType["EcardMtr"] = "M";
})(PackageType || (PackageType = {}));
/**
 * Get control codes from a `DataView` with controls ordered in chunks of three
 * bytes: first byte is control code, the next two bytes are the time from previous
 * control to this one.
 *
 * @param view control codes with corresponding times
 * @return an array with objects corresponding to the controls in the view
 */
export const getControlCodeInformation = (view) => {
    let codes = [];
    for (let i = 0; i < view.byteLength; i += 3) {
        const code = view.getUint8(i);
        if (i > 0 && code === 0) {
            /*
             * Only the first control can have code 0. The next occurence of code 0
             * means that we are finished reading controls.
             */
            break;
        }
        const time = (view.getUint8(i + 2) << 8) | view.getUint8(i + 1);
        codes.push({ code, time });
    }
    if (codes.length > 0) {
        /*
         * The last stamped code will occur in duplicates (number of duplicates will
         * depend on how long the runner let his runner unit be on the EKT-device).
         *
         * So we will remove duplicates of last control, since only the first punch matter
         */
        const { code: finishCode } = codes[codes.length - 1];
        const indexOfFirstPunchOfLastControl = codes.findIndex(({ code }) => code === finishCode);
        codes = codes.filter(({ code }, index) => code !== finishCode || index === indexOfFirstPunchOfLastControl);
    }
    return codes;
};
/**
 * Returns null if it does not exist `preambleLength` number of consecutive `0xFF`.
 * Else return start position of consecutive `0xFF`. If more than `preambleLength`
 * number of `0xFF`, ignore the first occurences.
 *
 * @return `null` if no preamble is found, else return position of start of preamble
 */
export const checkForNewReadPosition = (preambleLength, view, writePositionNewBytes, numberOfNewBytes) => {
    // Need to check if previous reading contained part of preamble
    const preamblePrevReading = preambleLength - 1;
    const possibleStart = writePositionNewBytes - preamblePrevReading;
    const startCheckPosition = possibleStart < 0 ? view.byteLength + possibleStart : possibleStart;
    let i = startCheckPosition, preambleCount = 0, preambleStart = null;
    for (let counter = 0; counter < numberOfNewBytes + preamblePrevReading; counter++) {
        if (view.getUint8(i) === 0xff) {
            if (preambleCount === 0) {
                preambleStart = i;
            }
            else if (preambleCount >= preambleLength && preambleStart) {
                /*
                 * preambleCount can be more than 4 if previous reading contained 1 or more
                 * 0xFF and current reading contains 4. Accept therefore only the last 4 0xFF
                 */
                preambleStart = (preambleStart + 1) % view.byteLength;
            }
            preambleCount++;
        }
        else if (preambleCount < preambleLength) {
            preambleCount = 0;
            preambleStart = null;
        }
        i = (i + 1) % view.byteLength;
    }
    return preambleCount < preambleLength ? null : preambleStart;
};
/** Start of reading, RTX byte */
export const USB_START_READ_BYTE = 0x02;
/** End of reading, ETX byte */
export const USB_STOP_READ_BYTE = 0x03;
/**
 * Get ringbuffer index for given byte in new byte data.
 *
 * @param ringBufferSize current ringbuffer size
 * @param writePositionNewBytes write position before new bytes are added
 * @param newBytes bytes to be added to ringbuffer
 * @param byte which byte to check existence for in new data
 * @return ringbuffer index of new read or write position if found, else return `null`
 */
export const getByteIndexInNewRingbufferData = (ringBufferSize, writePositionNewBytes, newBytes, byte) => {
    const maybeNewBytePos = newBytes.findIndex((newByte) => newByte === byte);
    if (maybeNewBytePos == -1) {
        return null;
    }
    return (writePositionNewBytes + maybeNewBytePos + 1) % ringBufferSize;
};
/**
 * Adds data to an existing ring buffer (changes the provided ring buffer,
 * side effect!). Returns the new offset.
 *
 * @param ringBuffer buffer that will have new data added, buffer will be changed
 * @param newData data to be added
 * @param offset where in buffer to start adding data
 * @return the new offset ((old + length of new data) % buffer size)
 */
export const addToRingBuffer = (ringBuffer, newData, offset) => {
    const newOffset = (offset + newData.byteLength) % ringBuffer.byteLength;
    if (offset + newData.byteLength <= ringBuffer.byteLength) {
        ringBuffer.set(newData, offset);
    }
    else {
        const splitPosition = newData.length - newOffset;
        ringBuffer.set(newData.slice(0, splitPosition), offset);
        ringBuffer.set(newData.slice(splitPosition), 0);
    }
    return newOffset;
};
/**
 * Calculates how many bytes the current reading consists of
 *
 * @param bufferSize size of ring buffer
 * @param readStart index of read start (inclusive)
 * @param readStop index of read stop (exclusive)
 */
export const ringBufferReadLength = (bufferSize, readStart, readStop) => {
    if (readStart <= readStop) {
        return readStop - readStart;
    }
    const endOfBuffer = bufferSize - readStart;
    return endOfBuffer + readStop;
};
/**
 * Returns an `Uint8Array` with the bytes from the ringbuffer that corresponds
 * to the given offset and length.
 */
export const getRangeFromRingBuffer = (ringBuffer, offset, length) => {
    if (offset + length <= ringBuffer.byteLength) {
        return ringBuffer.slice(offset, offset + length);
    }
    const start = ringBuffer.slice(offset);
    const end = ringBuffer.slice(0, (offset + length) % ringBuffer.byteLength);
    const range = new Uint8Array(length);
    range.set(start, 0);
    range.set(end, start.byteLength);
    return range;
};
export const getMessageType = (ringBuffer, offset, messageTypeOffset) => {
    const typeIndex = (offset + messageTypeOffset) % ringBuffer.byteLength;
    const typeValue = ringBuffer[typeIndex];
    if (typeValue === 0x53) {
        return PackageType.StatusMessage;
    }
    else if (typeValue === 0x4d) {
        return PackageType.EcardMtr;
    }
    else {
        return null;
    }
};
