// Nairobi County Administrative Hierarchy
// Sub-counties → Wards → Zones

export interface Zone {
  name: string;
}

export interface Ward {
  code: string;
  name: string;
  zones: Zone[];
}

export interface SubCounty {
  name: string;
  wards: Ward[];
}

export const NAIROBI_SUBCOUNTIES: SubCounty[] = [
  {
    name: "Westlands",
    wards: [
      { 
        code: "KILIMANI", 
        name: "Kilimani", 
        zones: [
          { name: "Yaya Centre" },
          { name: "Argwings Kodhek" },
          { name: "Hurlingham" },
          { name: "Valley Arcade" }
        ]
      },
      { 
        code: "KANGEMI", 
        name: "Kangemi", 
        zones: [
          { name: "Kangemi Market" },
          { name: "Mountain View" },
          { name: "Waruku" }
        ]
      },
      { 
        code: "KITISURU", 
        name: "Kitisuru", 
        zones: [
          { name: "Kitisuru" },
          { name: "Nyari" },
          { name: "Rosslyn" }
        ]
      },
      { 
        code: "PARKLANDS_HIGHRIDGE", 
        name: "Parklands/Highridge", 
        zones: [
          { name: "Parklands" },
          { name: "Highridge" },
          { name: "City Park" }
        ]
      },
      { 
        code: "KARURA", 
        name: "Karura", 
        zones: [
          { name: "Muthaiga" },
          { name: "Karura Forest" },
          { name: "Gigiri" }
        ]
      }
    ]
  },
  {
    name: "Starehe",
    wards: [
      { 
        code: "NGARA", 
        name: "Ngara", 
        zones: [
          { name: "Ngara East" },
          { name: "Ngara West" },
          { name: "Pangani" }
        ]
      },
      { 
        code: "NAIROBI_CENTRAL", 
        name: "Nairobi Central", 
        zones: [
          { name: "CBD" },
          { name: "KICC" },
          { name: "Railway Station" },
          { name: "Kencom" }
        ]
      },
      { 
        code: "LANDIMAWE", 
        name: "Landimawe", 
        zones: [
          { name: "Landimawe" },
          { name: "Makongeni" }
        ]
      },
      { 
        code: "NAIROBI_SOUTH", 
        name: "Nairobi South", 
        zones: [
          { name: "South B" },
          { name: "South C" },
          { name: "Nairobi West" }
        ]
      },
      { 
        code: "KARIOKOR", 
        name: "Kariokor", 
        zones: [
          { name: "Kariokor Market" },
          { name: "Ziwani" }
        ]
      }
    ]
  },
  {
    name: "Dagoretti North",
    wards: [
      { 
        code: "KILIMANI_DG", 
        name: "Kilimani", 
        zones: [
          { name: "Kilimani Estate" }
        ]
      },
      { 
        code: "KAWANGWARE", 
        name: "Kawangware", 
        zones: [
          { name: "Kawangware 46" },
          { name: "Kawangware 56" },
          { name: "Gatina" }
        ]
      },
      { 
        code: "GATINA", 
        name: "Gatina", 
        zones: [
          { name: "Gatina" },
          { name: "Riruta Satellite" }
        ]
      },
      { 
        code: "KILELESHWA", 
        name: "Kileleshwa", 
        zones: [
          { name: "Kileleshwa" },
          { name: "Lavington" }
        ]
      },
      { 
        code: "KABIRO", 
        name: "Kabiro", 
        zones: [
          { name: "Kabiro" },
          { name: "Waithaka" }
        ]
      }
    ]
  },
  {
    name: "Dagoretti South",
    wards: [
      { 
        code: "MUTUINI", 
        name: "Mutu-ini", 
        zones: [
          { name: "Mutu-ini" },
          { name: "Ruthimitu" }
        ]
      },
      { 
        code: "NGANDO", 
        name: "Ngando", 
        zones: [
          { name: "Ngando" },
          { name: "Riruta" }
        ]
      },
      { 
        code: "RIRUTA", 
        name: "Riruta", 
        zones: [
          { name: "Riruta" }
        ]
      },
      { 
        code: "UTHIRU_RUTHIMITU", 
        name: "Uthiru/Ruthimitu", 
        zones: [
          { name: "Uthiru" },
          { name: "Ruthimitu" }
        ]
      },
      { 
        code: "WAITHAKA", 
        name: "Waithaka", 
        zones: [
          { name: "Waithaka" }
        ]
      }
    ]
  },
  {
    name: "Lang'ata",
    wards: [
      { 
        code: "KAREN", 
        name: "Karen", 
        zones: [
          { name: "Karen" },
          { name: "Hardy" },
          { name: "Bogani" }
        ]
      },
      { 
        code: "NAIROBI_WEST_LG", 
        name: "Nairobi West", 
        zones: [
          { name: "Nairobi West" },
          { name: "Madaraka" }
        ]
      },
      { 
        code: "MUGUMONI", 
        name: "Mugumo-ini", 
        zones: [
          { name: "Mugumo-ini" },
          { name: "Otiende" }
        ]
      },
      { 
        code: "SOUTHC", 
        name: "South C", 
        zones: [
          { name: "South C" },
          { name: "Nyayo Estate" }
        ]
      },
      { 
        code: "NYAYO_HIGHRISE", 
        name: "Nyayo Highrise", 
        zones: [
          { name: "Nyayo Highrise" }
        ]
      }
    ]
  },
  {
    name: "Kibra",
    wards: [
      { 
        code: "LAINI_SABA", 
        name: "Laini Saba", 
        zones: [
          { name: "Laini Saba" }
        ]
      },
      { 
        code: "LINDI", 
        name: "Lindi", 
        zones: [
          { name: "Lindi" }
        ]
      },
      { 
        code: "MAKINA", 
        name: "Makina", 
        zones: [
          { name: "Makina" }
        ]
      },
      { 
        code: "WOODLEY_SARANGOMBE", 
        name: "Woodley/Kenyatta Golf Course", 
        zones: [
          { name: "Woodley" },
          { name: "Kenyatta Golf Course" }
        ]
      },
      { 
        code: "SARANGOMBE", 
        name: "Sarang'ombe", 
        zones: [
          { name: "Sarang'ombe" }
        ]
      }
    ]
  },
  {
    name: "Embakasi South",
    wards: [
      { 
        code: "IMARA_DAIMA", 
        name: "Imara Daima", 
        zones: [
          { name: "Imara Daima" },
          { name: "Kware" }
        ]
      },
      { 
        code: "KWA_NJENGA", 
        name: "Kwa Njenga", 
        zones: [
          { name: "Kwa Njenga" }
        ]
      },
      { 
        code: "KWA_REUBEN", 
        name: "Kwa Reuben", 
        zones: [
          { name: "Kwa Reuben" }
        ]
      },
      { 
        code: "PIPELINE", 
        name: "Pipeline", 
        zones: [
          { name: "Pipeline" }
        ]
      },
      { 
        code: "KWARE", 
        name: "Kware", 
        zones: [
          { name: "Kware" }
        ]
      }
    ]
  },
  {
    name: "Embakasi North",
    wards: [
      { 
        code: "KARIOBANGI_SOUTH", 
        name: "Kariobangi South", 
        zones: [
          { name: "Kariobangi South" }
        ]
      },
      { 
        code: "DANDORA_AREA_I", 
        name: "Dandora Area I", 
        zones: [
          { name: "Dandora Phase 1" }
        ]
      },
      { 
        code: "DANDORA_AREA_II", 
        name: "Dandora Area II", 
        zones: [
          { name: "Dandora Phase 2" },
          { name: "Dandora Phase 3" }
        ]
      },
      { 
        code: "DANDORA_AREA_III", 
        name: "Dandora Area III", 
        zones: [
          { name: "Dandora Phase 4" }
        ]
      },
      { 
        code: "DANDORA_AREA_IV", 
        name: "Dandora Area IV", 
        zones: [
          { name: "Dandora Phase 5" }
        ]
      }
    ]
  },
  {
    name: "Embakasi Central",
    wards: [
      { 
        code: "KAYOLE_NORTH", 
        name: "Kayole North", 
        zones: [
          { name: "Kayole North" }
        ]
      },
      { 
        code: "KAYOLE_CENTRAL", 
        name: "Kayole Central", 
        zones: [
          { name: "Kayole Central" }
        ]
      },
      { 
        code: "KAYOLE_SOUTH", 
        name: "Kayole South", 
        zones: [
          { name: "Kayole South" }
        ]
      },
      { 
        code: "KOMAROCK", 
        name: "Komarock", 
        zones: [
          { name: "Komarock" }
        ]
      },
      { 
        code: "MATOPENI", 
        name: "Matopeni/Spring Valley", 
        zones: [
          { name: "Matopeni" },
          { name: "Spring Valley" }
        ]
      }
    ]
  },
  {
    name: "Embakasi East",
    wards: [
      { 
        code: "UPPER_SAVANNA", 
        name: "Upper Savanna", 
        zones: [
          { name: "Upper Savanna" }
        ]
      },
      { 
        code: "LOWER_SAVANNA", 
        name: "Lower Savanna", 
        zones: [
          { name: "Lower Savanna" }
        ]
      },
      { 
        code: "EMBAKASI", 
        name: "Embakasi", 
        zones: [
          { name: "Embakasi Village" }
        ]
      },
      { 
        code: "UTAWALA", 
        name: "Utawala", 
        zones: [
          { name: "Utawala" },
          { name: "Mihango" }
        ]
      },
      { 
        code: "MIHANGO", 
        name: "Mihango", 
        zones: [
          { name: "Mihango" }
        ]
      }
    ]
  },
  {
    name: "Embakasi West",
    wards: [
      { 
        code: "UMOJA_I", 
        name: "Umoja I", 
        zones: [
          { name: "Umoja 1" }
        ]
      },
      { 
        code: "UMOJA_II", 
        name: "Umoja II", 
        zones: [
          { name: "Umoja 2" },
          { name: "Umoja Innercore" }
        ]
      },
      { 
        code: "MOWLEM", 
        name: "Mowlem", 
        zones: [
          { name: "Mowlem" }
        ]
      },
      { 
        code: "KARIOBANGI_NORTH", 
        name: "Kariobangi North", 
        zones: [
          { name: "Kariobangi North" }
        ]
      }
    ]
  },
  {
    name: "Makadara",
    wards: [
      { 
        code: "MARINGO_HAMZA", 
        name: "Maringo/Hamza", 
        zones: [
          { name: "Maringo" },
          { name: "Hamza" }
        ]
      },
      { 
        code: "VIWANDANI", 
        name: "Viwandani", 
        zones: [
          { name: "Industrial Area" },
          { name: "Viwandani" }
        ]
      },
      { 
        code: "HARAMBEE", 
        name: "Harambee", 
        zones: [
          { name: "Harambee" },
          { name: "Jericho" }
        ]
      },
      { 
        code: "MAKONGENI_MK", 
        name: "Makongeni", 
        zones: [
          { name: "Makongeni" },
          { name: "Ofafa Jericho" }
        ]
      }
    ]
  },
  {
    name: "Kamukunji",
    wards: [
      { 
        code: "PUMWANI", 
        name: "Pumwani", 
        zones: [
          { name: "Pumwani" },
          { name: "Majengo" }
        ]
      },
      { 
        code: "EASTLEIGH_NORTH", 
        name: "Eastleigh North", 
        zones: [
          { name: "Eastleigh North" },
          { name: "California" }
        ]
      },
      { 
        code: "EASTLEIGH_SOUTH", 
        name: "Eastleigh South", 
        zones: [
          { name: "Eastleigh South" },
          { name: "Airbase" }
        ]
      },
      { 
        code: "AIRBASE", 
        name: "Airbase", 
        zones: [
          { name: "Airbase" }
        ]
      },
      { 
        code: "CALIFORNIA", 
        name: "California", 
        zones: [
          { name: "California" }
        ]
      }
    ]
  },
  {
    name: "Kasarani",
    wards: [
      { 
        code: "CLAY_CITY", 
        name: "Clay City", 
        zones: [
          { name: "Clay City" }
        ]
      },
      { 
        code: "MWIKI", 
        name: "Mwiki", 
        zones: [
          { name: "Mwiki" },
          { name: "Kasarani" }
        ]
      },
      { 
        code: "KASARANI", 
        name: "Kasarani", 
        zones: [
          { name: "Kasarani" },
          { name: "Seasons" }
        ]
      },
      { 
        code: "NJIRU", 
        name: "Njiru", 
        zones: [
          { name: "Njiru" }
        ]
      },
      { 
        code: "RUAI", 
        name: "Ruai", 
        zones: [
          { name: "Ruai" }
        ]
      }
    ]
  },
  {
    name: "Roysambu",
    wards: [
      { 
        code: "GITHURAI", 
        name: "Githurai", 
        zones: [
          { name: "Githurai 44" },
          { name: "Githurai 45" }
        ]
      },
      { 
        code: "KAHAWA_WEST", 
        name: "Kahawa West", 
        zones: [
          { name: "Kahawa West" }
        ]
      },
      { 
        code: "ZIMMERMAN", 
        name: "Zimmerman", 
        zones: [
          { name: "Zimmerman" }
        ]
      },
      { 
        code: "ROYSAMBU", 
        name: "Roysambu", 
        zones: [
          { name: "Roysambu" },
          { name: "Garden Estate" }
        ]
      },
      { 
        code: "KAHAWA", 
        name: "Kahawa", 
        zones: [
          { name: "Kahawa" },
          { name: "Kenyatta University" }
        ]
      }
    ]
  },
  {
    name: "Ruaraka",
    wards: [
      { 
        code: "BABA_DOGO", 
        name: "Baba Dogo", 
        zones: [
          { name: "Baba Dogo" }
        ]
      },
      { 
        code: "UTALII", 
        name: "Utalii", 
        zones: [
          { name: "Utalii" },
          { name: "Muthaiga North" }
        ]
      },
      { 
        code: "MATHARE_NORTH", 
        name: "Mathare North", 
        zones: [
          { name: "Mathare North" }
        ]
      },
      { 
        code: "LUCKY_SUMMER", 
        name: "Lucky Summer", 
        zones: [
          { name: "Lucky Summer" }
        ]
      },
      { 
        code: "KOROGOCHO", 
        name: "Korogocho", 
        zones: [
          { name: "Korogocho" }
        ]
      }
    ]
  },
  {
    name: "Mathare",
    wards: [
      { 
        code: "HOSPITAL", 
        name: "Hospital", 
        zones: [
          { name: "Mathare Hospital" }
        ]
      },
      { 
        code: "MABATINI", 
        name: "Mabatini", 
        zones: [
          { name: "Mabatini" }
        ]
      },
      { 
        code: "HURUMA", 
        name: "Huruma", 
        zones: [
          { name: "Huruma" }
        ]
      },
      { 
        code: "NGEI", 
        name: "Ngei", 
        zones: [
          { name: "Ngei" }
        ]
      },
      { 
        code: "MLANGO_KUBWA", 
        name: "Mlango Kubwa", 
        zones: [
          { name: "Mlango Kubwa" }
        ]
      },
      { 
        code: "KIAMAIKO", 
        name: "Kiamaiko", 
        zones: [
          { name: "Kiamaiko" }
        ]
      }
    ]
  }
];

// Helper functions
export function getWardsBySubCounty(subCountyName: string): Ward[] {
  const subCounty = NAIROBI_SUBCOUNTIES.find(sc => sc.name === subCountyName);
  return subCounty?.wards || [];
}

export function getZonesByWard(subCountyName: string, wardCode: string): Zone[] {
  const subCounty = NAIROBI_SUBCOUNTIES.find(sc => sc.name === subCountyName);
  const ward = subCounty?.wards.find(w => w.code === wardCode);
  return ward?.zones || [];
}

export function getWardByCode(wardCode: string): { ward: Ward; subCounty: string } | null {
  for (const subCounty of NAIROBI_SUBCOUNTIES) {
    const ward = subCounty.wards.find(w => w.code === wardCode);
    if (ward) {
      return { ward, subCounty: subCounty.name };
    }
  }
  return null;
}
