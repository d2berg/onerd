interface PunchingUnitType {}

interface Entry {
  EntryId: [number];
  Competitor: [
    {
      CompetitorId: [number];
      Person: [
        {
          $: { sex: string };
          PersonName: {
            Family: [string];
            Given: [{ $: { sequence: string }; _: string }];
          };
          PersonId: [number];
          BirthDate: { Date: [string] };
          Nationality: { CountryId: { $: { value: string } } };
          OrganisationId: number;
          ModifyDate: {
            Date: string;
            Clock: string;
          };
        }
      ];
      Organisation: [{
        OrganisationId: [number];
        Name: [string];
        ShortName: [string];
        MediaName: [string];
        OrganisationTypeId: [number];
        CountryId: { $: { value: string } };
        ParentOrganisation: {
          OrganisationId: [number];
        };
        ModifyDate: {
          Date: [string];
          Clock: [string];
        };
      }];
      CCard: [
        {
          CCardId: [number];
          PunchingUnitType: {
            $: {
              value: string;
            };
          };
        }
      ];
      ModifyDate: {
        Date: string;
        Clock: string;
      };
      ModifiedBy: {
        PersonId: number;
      };
    }
  ];
  EntryClass: {
    $: { sequence: string };
    EventClassId: number;
  };
  EventId: number;
  EventRaceId: number;
  BibNumber: string;
  EntryDate: {
    Date: string;
    Clock: string;
  };
  CreatedBy: {
    PersonId: number;
  };
  ModifyDate: [
    {
      Date: string;
      Clock: string;
    }
  ];
  ModifiedBy: {
    PersonId: number;
  };
}

interface EntryList {
  EntryList: {
    $: {
      "xmlns:xsi": string;
      "xmlns:xsd": string;
    };
    Entry: Entry[];
  };
}
