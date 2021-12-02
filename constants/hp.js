import { Dimensions, Platform } from "react-native";
import { THEME } from "../DynamicStyle/style";
const { width, height } = Dimensions.get("window");
import { OfficialStores } from "./StoresData";

const ygn2kregion = [
  "Botataung",
  "Kyauktada",
  "Lanmadaw",
  "Mingalar Taungnyunt",
  "Pabedan",
  "Pazundaung",
];
const ygn25kregion = [
  "Ahlone",
  "Bahan",
  "Dawbon",
  "Hlaing",
  "Insein",
  "Kamayut",
  "Kyimyindaing",
  "Mayangon",
  "Mingaladon",
  "North Dagon",
  "North Okkalapa",
  "Sanchaung",
  "South Dagon",
  "South Okkalapa",
  "Tarmwe",
  "Thaketa",
  "Thanlyin",
  "Thingangyun",
  "Yankin",
];
const ygn30kregion = [
  "Dagon Myo Thit Seikkan",
  "Hlaing Thaya (East)",
  "Hlaing Thaya (West)",
  "East Dagon",
  "Shwepyithar",
];
const ygn40kregion = [
  "Htaukyant",
  "Hle Gu",
  "Hmawbi",
  "Kyauk Tan",
  "Ka Yan",
  "Thone Kwa",
  "Thike Kyi",
  "Dala",
];

export const hp = {
  getMallSlider: () => [],
  getStoreSlider: () => [],
  strtoInt: (str) => {
    return parseInt(str.match(/\d/g).join(""));
  },

  strfix: (str) => {
    return str.replace("&amp;", "&");
  },
  strWithDash: (str) => {
    return str.replace(/[." "]/g, "-").toLowerCase();
  },
  getHomeServices: () => [
    {
      img: require("../assets/images/services/1.png"),
      name: "Gromming",
    },
    {
      img: require("../assets/images/services/2.png"),
      name: "Pet Clinic",
    },
    {
      img: require("../assets/images/services/3.png"),
      name: "Training",
    },
  ],
  getHomeCat: () => [
    {
      img: require("../assets/images/category/petGroom.png"),
      name: "Pet Grooming & Hygien",
      id: 488,
    },
    {
      img: require("../assets/images/category/petFashion.png"),
      name: "Pet Fashion",
      id: 2198,
    },
    {
      img: require("../assets/images/category/petSnack.png"),
      name: "Pet Snacks",
      id: 2903,
    },
    {
      img: require("../assets/images/category/petFood.png"),
      name: "Pet Foods",
      id: 486,
    },
    {
      img: require("../assets/images/category/petToy.png"),
      name: "Pet Toys",
      id: 2909,
    },
    {
      img: require("../assets/images/category/petMedicine.png"),
      name: "Pet Medicine & Health",
      id: 2910,
    },
  ],
  getHomeRedBoxImage: () => [
    {
      img: require("../assets/images/red_box/1.png"),
      title: "ကိုယ်တိုင်လာယူလို့ရတဲ့အစီအစဉ်",
      description:
        "နေ့စဉ်ည (၇) နာရီနောက်ဆုံးထားပြီး ပစ္စည်းလာယူလို့ရပါတယ်။ပစ္စည်းလာယူတဲ့အခါ TOMATO ရဲ့ Hotline Number ကိုဖုန်းကြိုဆက်ပြီး Order Number နဲ့တူလာယူလို့ရပါတယ်။အော်ဒါကို၃ရက်အတွင်းလာယူရပါမယ်။ မဟုတ်ပါက အော်ဒါcancelအဖြစ်သတ်မှတ်ပါမယ်။",
    },
    {
      img: require("../assets/images/red_box/2.png"),
      title:
        "TOMATO မှာ SIGN IN ဝင်ပြီး ငါးသောင်းဖိုးနှင့်အထက်ဝယ်ယူပြီးပို့ ဆောင်ခအခမဲ့ရယူလိုက်ပါ",
      description:
        "အခမဲ့ဝယ်ယူအားပေးတဲ့ customers များအတွက်ငါးသောင်းဖိုးနှင့်အထက်ဝယ်ယူသူတိုင်းကိုပို့ ခအခမဲ့နဲ့ပို့ ဆောင်ပေးသွားမှာဖြစ်ပါတယ်။ ဝယ်ယူသူတွေအနေနဲ့Sign In ဝင်ပြီး လျော့ဈေးရယူရမှာဖြစ်ပါတယ်။    လျော့ဈေးရပြီးနောက်အကောက်ခွန် (Tax) နှင့်ကုန်ကျငွေသာပေးချေရမှာဖြစ်ပါတယ်။ ဝယ်ယူသောပစ္စည်း၏ အလေးချ ိန်နှင့်အရွယ်အစားပေါ်မူတည်ပြီး အပိုသယ်ယူပို့ ဆောင်ခနဲ့အထူးထိန်းသိမ်းခများ ကျသင့်နိုင်ပါတယ်။ပို့ ဆောင်မှုအခမဲ့အစီအစဉ်သည်ဈေးလျော့ထားပြီးသောပစ္စည်းများဝယ်ယူခြင်းအတွက်အကျူံးမဝင်ပါ။အထက်ဖော်ပြပါ အကြောင်းအရာများကို TOMATO Teamကသာပြောင်းလဲခွင့်ရှိပါတယ်။",
    },
    {
      img: require("../assets/images/red_box/3.png"),
      title: "နေ့ချင်းအမြန်ပို့ ဝန်ဆောင်မှု",
      description:
        "နေ့ချင်းပို့ ဆောင်မှုရဲ့ အားသာချက်ကေတာ့သင်ဝယ်ယူလိုသောကုန်ပစ္စည်းကိုတစ်ရက်အတွင်း ရရှိနိုင်ပြီး ပို့ ဆောင်ချ ိန်ကိုလည်းရွေးချယ်လို့ရပါတယ်။ သင့်ဆီသို့နေ့ချင်းအမြန်ပို့ ဝန်ဆောင်မှု ရခြင်း မရခြင်းကိုပို့ ဆောင်ရမည့်နေရာကိုဖြည့်စွက်ပါကသိရှိနိုင်ပါသည်။ ပို့ ဆောင်မည်ဆိုပါက ကြိုတင်စာပို့ ပေးပါသည်။နေ့ချင်းပို့ ဆောင်ခြင်းဝန်ဆောင်မှုကိုရန်ကုန်မြို့တွင်းမှာရရှိနိုင်ပါတယ်။မနက်(၉) နာရီတွင်မှာယူသောအော်ဒါကိုနေ့ခင်း(၁၂)နာရီနဲ့ညနေ(၃)နာရီအတွင်းမှာရရှိမှာဖြစ်ပြီး၊နေ့ခင်း (၁)နာရီတွင်မှာယူသောအော်ဒါကို ညနေ(၃)နာရီနဲ့ညနေ(၆)နာရီအတွင်းမှာရရှိမှာဖြစ်ပြီး၊ညနေ(၃)နာရီမှာ မှာယူတဲ့အော်ဒါကိုညနေ (၆)နာရီနဲ့ည(၈)နာရီအတွင်းမှာ ရရှိမှာဖြစ်ပါတယ်။ညနေ(၃)နာရီနောက်ပိုင်း တင်တဲ့အော်ဒါတွေကိုတော့နောက်နေ့မှာဆက်လက်ပို့ ဆောင်ပေးမှာဖြစ်ပါတယ်။ကုန်ပစ္စည်းအရေအတွက်ကန့်သတ်ထားပြီး ပစ္စည်းကျန်သည်အထိဝယ်ယူနိုင်ပါသည်။ စွမ်းအင်ပြတ်လတ်ခြင်း၊ သဘာဝဘေး၊နိုင်ငံရေးလှုပ်ရှားမှုစဖြင့်အခက်အခဲရှိပါကပို့ ဆောင်မှုကြန့်ကြာနိုင်ပါတယ်။",
    },
    {
      img: require("../assets/images/red_box/4.png"),
    },
  ],
  getStoreCatIcon: () => [
    {
      logo: require("../assets/images/mall_icons/flash_deals/1.png"),
      name: "Flash Deals",
    },
    {
      logo: require("../assets/images/15.png"),
      name: "Trending Official Stores",
    },
    {
      logo: require("../assets/images/30.png"),
      name: "Tomato Mart",
    },
    {
      logo: require("../assets/images/9.png"),
      name: "Beauty Stores",
    },
    {
      logo: require("../assets/images/25.png"),
      name: "Food & Beverages Stores",
    },
    {
      logo: require("../assets/images/26.png"),
      name: "Tech Stores",
    },
    {
      logo: require("../assets/images/8.png"),
      name: "Electronic Stores",
    },
    {
      logo: require("../assets/images/7.png"),
      name: "Kids Stores",
    },
    {
      logo: require("../assets/images/24.png"),
      name: "Fashion Stores",
    },
    {
      logo: require("../assets/images/17.png"),
      name: "Discover Stores",
    },
  ],
  getHomeSlider: () => [
    {
      img: require("../assets/images/slider/slider1.jpg"),
    },
  ],

  getTomatoTrendingStores: () => [
    {
      id: 42,
      img: require("../assets/images/store/uniliver.jpg"),
      name: "Unilever EAC Myanmar",
      route: "UnileverEAC",
    },
    {
      id: 69,
      img: require("../assets/images/store/cutepress.jpeg"),
      name: "Cute Press",
      route: "CutePress",
    },
    // {
    //   id: 0,
    //   img: require("../assets/images/placeholder.jpg"),
    // },
    {
      id: 30,
      img: require("../assets/images/store/garnier.jpg"),
      name: "Garnier",
      route: "Garnier",
    },
    {
      id: 68,
      img: require("../assets/images/store/loreal.jpg"),
      name: "L'Oreal",
      route: "Loreal",
    },
    {
      id: 31,
      img: require("../assets/images/store/panasonicbeauty.png"),
      name: "Panasonic Beauty",
      // route: "PanasonicBeauty",
    },
  ],

  getBeautyStores: () => [
    {
      id: 30,
      img: require("../assets/images/store/garnier.jpg"),
    },
    {
      id: 42,
      img: require("../assets/images/store/uniliver.jpg"),
    },
    {
      id: 74,
      img: require("../assets/images/store/maybeline.jpg"),
    },
    {
      id: 69,
      img: require("../assets/images/store/cutepress.jpeg"),
    },
    {
      id: 68,
      img: require("../assets/images/store/loreal.jpg"),
    },
    {
      id: 70,
      img: require("../assets/images/store/code10.png"),
    },
    {
      id: 42,
      img: require("../assets/images/store/clear.png"),
    },
    {
      id: 213,
      img: require("../assets/images/store/pond.png"),
    },
    {
      id: 31,
      img: require("../assets/images/store/panasonicbeauty.png"),
    },
    {
      id: 42,
      img: require("../assets/images/store/rexona.jpg"),
    },
    {
      id: 215,
      img: require("../assets/images/store/vaseline.png"),
    },
    {
      id: 443,
      img: require("../assets/images/store/sai_cosmetic.jpg"),
    },
    {
      id: 511,
      img: require("../assets/images/store/stimmung.jpg"),
    },
    {
      id: 505,
      img: require("../assets/images/store/yves_rocher.png"),
    },
  ],

  getFoodAndVeveragesStores: () => [
    {
      id: 14,
      img: require("../assets/images/store/nestleMyanmar.png"),
    },
    {
      id: 92,
      img: require("../assets/images/store/oval.jpg"),
    },
    {
      id: 73,
      img: require("../assets/images/store/no_name.jpg"),
    },
    {
      id: 70,
      img: require("../assets/images/store/dksh.png"),
    },
    {
      id: 269,
      img: require("../assets/images/store/dugro.jpg"),
    },
    {
      id: 42,
      img: require("../assets/images/store/knorr.jpg"),
    },
    {
      id: 14,
      img: require("../assets/images/store/milo.png"),
    },
    {
      id: 233,
      img: require("../assets/images/store/nestle_professional.jpg"),
    },
    {
      id: 81,
      img: require("../assets/images/store/royalD.jpg"),
    },
    {
      id: 81,
      img: require("../assets/images/store/royalD.jpg"),
    },
  ],

  getTechStores: () => [
    {
      id: null,
      img: require("../assets/images/store/samsung.jpg"),
    },
    {
      id: 100,
      img: require("../assets/images/store/asus-logo1.jpg"),
    },
    {
      id: 317,
      img: require("../assets/images/store/hp.png"),
    },
    {
      id: 317,
      img: require("../assets/images/store/acer.jpg"),
    },
    {
      id: 317,
      img: require("../assets/images/store/msi.png"),
    },
    {
      id: 340,
      img: require("../assets/images/store/konfulon.jpg"),
    },
    {
      id: 488,
      img: require("../assets/images/store/huawei.jpg"),
    },
    {
      id: 293,
      img: require("../assets/images/store/xo.jpg"),
    },
    {
      id: 569,
      img: require("../assets/images/store/ascentTechnology.jpg"),
    },
    {
      id: 59,
      img: require("../assets/images/store/remaxMyanmar.png"),
    },
  ],

  getElectronicStores: () => [
    {
      id: 25,
      img: require("../assets/images/store/midea.jpg"),
    },
    {
      id: 750,
      img: require("../assets/images/store/beko.png"),
    },
    {
      id: 25,
      img: require("../assets/images/store/midea.jpg"),
    },
    {
      id: 750,
      img: require("../assets/images/store/beko.png"),
    },
    {
      id: 25,
      img: require("../assets/images/store/midea.jpg"),
    },
    {
      id: 750,
      img: require("../assets/images/store/beko.png"),
    },
  ],
  getKidsStores: () => [
    {
      id: null,
      img: require("../assets/images/store/mykids.jpg"),
    },
    {
      id: 56,
      img: require("../assets/images/store/pigeon.png"),
    },
    {
      id: 307,
      img: require("../assets/images/store/naturehugs.jpg"),
    },
    {
      id: null,
      img: require("../assets/images/store/mamyPoko.jpg"),
    },
    {
      id: 788,
      img: require("../assets/images/store/gooN.jpg"),
    },
  ],
  getFashionStores: () => [
    {
      id: 618,
      img: require("../assets/images/store/giordano.jpg"),
    },
    {
      id: null,
      img: require("../assets/images/store/nichii.jpg"),
    },
    {
      id: 618,
      img: require("../assets/images/store/giordano.jpg"),
    },
    {
      id: null,
      img: require("../assets/images/store/nichii.jpg"),
    },
    {
      id: 618,
      img: require("../assets/images/store/giordano.jpg"),
    },
    {
      id: null,
      img: require("../assets/images/store/nichii.jpg"),
    },
  ],

  getHomeOfficialStores: () => [
    {
      id: 30,
      img: require("../assets/images/store/garnier.jpg"),
      name: "Garnier",
      route: "Garnier",
    },
    {
      id: 42,
      img: require("../assets/images/store/uniliver.jpg"),
      name: "Unilever EAC Myanmar",
      route: "UnileverEAC",
    },
    {
      id: 59,
      img: require("../assets/images/store/remax.png"),
      name: "Remax Myanmar",
      route: "Remax",
    },
    {
      id: 74,
      img: require("../assets/images/store/maybeline.jpg"),
      name: "Maybelline Newyork Myanmar",
      route: "Maybelline",
    },
    {
      id: 14,
      img: require("../assets/images/store/nestle.jpg"),
      name: "Nestle Myanmar Official Store",
      route: "Nestle",
    },
    {
      id: 68,
      img: require("../assets/images/store/loreal.jpg"),
      name: "L'Oreal",
      route: "Loreal",
    },
    {
      id: 69,
      img: require("../assets/images/store/cutepress.jpeg"),
      name: "Cute Press",
      route: "CutePress",
    },
    {
      id: 53,
      img: require("../assets/images/store/cocacola.jpg"),
      name: "Coca-Cola Official Store",
      route: "CocaCola",
    },
    {
      id: 92,
      img: require("../assets/images/store/oval.jpg"),
      name: "Ovaltine",
      route: "Ovaltine",
    },
    {
      id: 73,
      img: require("../assets/images/store/no_name.jpg"),
      name: "Pahtama Group",
      route: "Pahtama",
    },
    // {
    //   id: 317,
    //   name: 'Acer',
    //   route: 'Acer'
    // },
    // {
    //   id: 72,
    //   name: 'Acnes Myanmar',
    //   route: 'Acnes'
    // },
    // {
    //   id: 569,
    //   name: 'Ascent Technology',
    //   route: 'AscentTechnology'
    // },
    // {
    //   id: 100,
    //   name: 'ASUS Official Store',
    //   route: 'ASUS'
    // },
    // {
    //   id: 232,
    //   name: 'Aung Kabar Trading',
    //   route: 'AungKaBarTrading'
    // },
    // {
    //   id: 55,
    //   name: 'Baby Mild Official Store',
    //   route: 'BabyMild'
    // },
    // {
    //   id: 514,
    //   name: 'Beausta Official Store',
    //   route: 'Beausta'
    // },
    // {
    //   id: 750,
    //   name: 'Beko Official Store',
    //   route: 'Beko'
    // },
    // {
    //   id: 38,
    //   name: 'Betadine Official Store',
    //   route: 'Betadine'
    // },
    // {
    //   id: 44,
    //   name: 'Bio-Oil Official Store',
    //   route: 'BioOil'
    // },
    // {
    //   id: '217',
    //   name: 'Citra Official Store',
    //   route: 'Citra'
    // },
    // {
    //   id: '42',
    //   name: 'Clear Official Store',
    //   route: 'Clear'
    // },
    // {
    //   id: '70',
    //   name: 'Code 10 Official Store',
    //   route: 'Code10'
    // }
    // {
    //   id: '',
    //   name: 'D-nee Official Store',
    //   route: 'DNee'
    // },
    // {
    //   id: '70',
    //   name: 'DKSH Official Store',
    //   route: 'DKSH'
    // },
    // {
    //   id: '269',
    //   name: 'Dumex Gugro 3 Official Store',
    //   route: 'DumexGugro3'
    // },
    // {
    //   id: '42',
    //   name: 'E-LAN Official Store',
    //   route: 'ELan'
    // },
    // {
    //   id: '43',
    //   name: 'EABC Official Store',
    //   route: 'EABC'
    // },
    // {
    //   id: '42',
    //   name: 'Family Care Official Store',
    //   route: 'FamilyCare'
    // },
    // {
    //   id: '618',
    //   name: 'Giordano Official Store',
    //   route: 'Giordano'
    // },
    // {
    //   id: '788',
    //   name: 'Goo.N Official Store',
    //   route: 'GooN'
    // },
    // {
    //   id: "71",
    //   name: "Heineken Myanmar Official Store",
    //   route: "Heineken",
    // },
    // {
    //   id: "317",
    //   name: "HP Official Store",
    //   route: "HP",
    // },
    // {
    //   id: "488",
    //   name: "Huawei Official Store",
    //   route: "Huawei",
    // },
    // {
    //   id: "479",
    //   name: "JayJun Official Store",
    //   route: "JayJun",
    // },
    // {
    //   id: "",
    //   name: "KA Cosmetic Official Store",
    //   route: "KA",
    // },
    // {
    //   id: "",
    //   name: "Kawasaki Official Store",
    //   route: "Kawasaki",
    // },
    // {
    //   id: "42",
    //   name: "Knorr Official Store",
    //   route: "Knorr",
    // },
    // {
    //   id: "503",
    //   name: "Konda Official Store",
    //   route: "Konda",
    // },
    // {
    //   id: "340",
    //   name: "Konfulon Official Store",
    //   route: "Konfulon",
    // },
    // {
    //   id: "42",
    //   name: "Lifebuoy Official Store",
    //   route: "Lifebuoy",
    // },
    // {
    //   id: "61",
    //   name: "LipIce Official Store",
    //   route: "Lipice",
    // },
    // {
    //   id: "214",
    //   name: "LUX Official Store",
    //   route: "LUX",
    // },
    // {
    //   id: "",
    //   name: "MammyPoko Official Store",
    //   route: "MamyPoko",
    // },
    // {
    //   id: "",
    //   name: "Marico Myanmar Official Store",
    //   route: "Marico",
    // },
    // {
    //   id: "33",
    //   name: "Max and Mia Official Store",
    //   route: "MaxAndMia",
    // },
    // {
    //   id: "489",
    //   name: "Mediheal Official Store",
    //   route: "Mediheal",
    // },
    // {
    //   id: "237",
    //   name: "Mi Official Store",
    //   route: "Mi",
    // },
    // {
    //   id: "799",
    //   name: "Micro Scooter Myanmar Official Store",
    //   route: "MicroScooter",
    // },
    // {
    //   id: "25",
    //   name: "Midea Official Store",
    //   route: "Midea",
    // },
    // {
    //   id: "14",
    //   name: "Milo Official Store",
    //   route: "Milo",
    // },
    // {
    //   id: "317",
    //   name: "MSI Official Store",
    //   route: "MSI",
    // },
    // {
    //   id: "307",
    //   name: "Nature Hugs Official Store",
    //   route: "NatureHugs",
    // },
    // {
    //   id: "233",
    //   name: "Nestle Professional Myanmar Official Store",
    //   route: "NestleProfessional",
    // },
    // {
    //   id: "",
    //   name: "Olay Official Store",
    //   route: "Olay",
    // },
    // {
    //   id: "120",
    //   name: "P&G Myanmar Official Store",
    //   route: "PAndG",
    // },
    // {
    //   id: "120",
    //   name: "Pampers Official Store",
    //   route: "Pampers",
    // },
    // {
    //   id: "31",
    //   name: "Panasonic Beauty Official Store",
    //   route: "PanasonicBeauty",
    // },
    // {
    //   id: "49",
    //   name: "Parachute Official Store",
    //   route: "Parachute",
    // },
    // {
    //   id: "56",
    //   name: "Pigeon Official Store",
    //   route: "Pigeon",
    // },
    // {
    //   id: "213",
    //   name: "PONDS Official Store",
    //   route: "PONDS",
    // },
    // {
    //   id: 446,
    //   name: "RDC Company Limited Official Stroe",
    //   route: "RDC",
    // },
    // {
    //   id: 81,
    //   name: "Royal-D Official Store",
    //   route: "RoyalD",
    // },
    // {
    //   id: 42,
    //   name: "Rexona Official Store",
    //   route: "Rexona",
    // },
    // {
    //   id: 443,
    //   name: "Sai Cosmetix Official Store",
    //   route: "SaiCosmetix",
    // },
    // {
    //   id: 231,
    //   name: "Star Secret Korea Official Store",
    //   route: "StarSecretKorea",
    // },
    // {
    //   id: 511,
    //   name: "Stimmung Official Store ",
    //   route: "Stimmung",
    // },
    // {
    //   id: 533,
    //   name: "Super Red Official Store",
    //   route: "SuperRed",
    // },
    // {
    //   id: 215,
    //   name: "VASELINE Official Store",
    //   route: "Vaseline",
    // },
    // {
    //   id: 64,
    //   name: "Warrix Official Store",
    //   route: "Warrix",
    // },
    // {
    //   id: 293,
    //   name: "XO official Store",
    //   route: "Xo",
    // },
    // {
    //   id: 505,
    //   name: "YVES ROCHER Official Store",
    //   route: "YvesRocher",
    // },
    // {
    //   id: 1501,
    //   name: "Covid Safety Package",
    //   route: "CovidSafetyPackage",
    // },
    // {
    //   id: 1124,
    //   name: "Myanmar Consumer Enterprise",
    //   route: "MyanmarConsumerEnterprise",
    // },
    // {
    //   id: 1006,
    //   name: "Crayola Official Store",
    //   route: "Crayola",
    // },
  ],
  // getBeautyStores: () => [
  //   {
  //     id: 68,
  //     img: require("../assets/images/store/loreal.jpg"),
  //     name: "L'Oreal",
  //     route: "Loreal",
  //   },
  //   {
  //     id: 30,
  //     img: require("../assets/images/store/garnier.jpg"),
  //     name: "Garnier",
  //     route: "Garnier",
  //   },
  //   {
  //     id: 69,
  //     img: require("../assets/images/store/cutepress.jpeg"),
  //     name: "Cute Press",
  //     route: "CutePress",
  //   },
  //   {
  //     id: 213,
  //     img: require("../assets/images/store/ponds.jpg"),
  //     name: "Pond's Official Store",
  //   },
  //   {
  //     id: 102,
  //     img: require("../assets/images/store/olay.png"),
  //     name: "Olay Skincare Myanmar",
  //   },

  //   {
  //     id: 51,
  //     img: require("../assets/images/store/dr.jpg"),
  //     name: "Dr.Face",
  //   },
  // ],
  // getElectronicStores: () => [
  //   {
  //     id: 65,
  //     img: require("../assets/images/store/panasonic.jpg"),
  //     name: "Panasonic Myanmar",
  //   },
  //   {
  //     id: 59,
  //     img: require("../assets/images/store/remax.png"),
  //     name: "Remax Myanmar",
  //     route: "Remax",
  //   },
  //   {
  //     id: 25,
  //     img: require("../assets/images/store/midea.jpg"),
  //     name: "Midea Electronic",
  //     route: "Midea",
  //   },
  //   {
  //     id: 29,
  //     img: require("../assets/images/store/philips.jpg"),
  //     name: "Philips Home Living Myanmar",
  //   },
  //   {
  //     id: 100,
  //     img: require("../assets/images/store/asus-logo.jpg"),
  //     name: "ASUS",
  //     route: "ASUS",
  //   },
  // ],
  getZayStores: () => [
    {
      id: 85,
      img: require("../assets/images/store/sausage.png"),
      name: "CP Myanmar",
    },
    {
      id: 0,
      img: require("../assets/images/store/milo.png"),
      name: "Milo",
      route: "Milo",
    },
    {
      id: 0,
      img: require("../assets/images/store/oreo.png"),
      name: "Oreo",
    },
    {
      id: 103,
      img: require("../assets/images/store/brands.jpeg"),
      name: "Brand's Myanmar",
    },
  ],
  // getKidsStores: () => [
  //   {
  //     id: 55,
  //     img: require("../assets/images/store/babymilk.jpeg"),
  //     name: "Babi Mild",
  //   },
  //   {
  //     id: 56,
  //     img: require("../assets/images/store/pigeon.png"),
  //     name: "Pigeon",
  //   },
  //   {
  //     id: 269,
  //     img: require("../assets/images/store/dumex.jpeg"),
  //     name: "Dumex",
  //     route: "DumexGugro3",
  //   },
  //   {
  //     id: 0,
  //     img: require("../assets/images/store/similace.jpeg"),
  //     name: "Similace",
  //   },
  //   {
  //     id: 0,
  //     img: require("../assets/images/store/carelac.jpg"),
  //     name: "Carelac",
  //   },
  // ],
  getPetStores: () => [
    {
      id: 0,
      img: require("../assets/images/store/meo.png"),
      name: "Me-0",
    },
    {
      id: 0,
      img: require("../assets/images/store/Royal-Canin.jpg"),
      name: "Royal Canin",
    },
    {
      id: 0,
      img: require("../assets/images/store/smartheart.png"),
      name: "Smart Heart",
    },
    {
      id: 78,
      img: require("../assets/images/store/similace.jpeg"),
      name: "My Pet Myanmar",
    },
    {
      id: 0,
      img: require("../assets/images/store/mypet.jpg"),
      name: "Carelac",
    },
  ],
  getMegaStore: () => [
    {
      id: 30,
      img: require("../assets/images/store/garnier.jpg"),
      name: "Garnier",
      route: "Garnier",
    },
    {
      id: 69,
      img: require("../assets/images/store/cutepress.jpeg"),
      name: "Cute press",
      route: "CutePress",
    },
    {
      id: 0,
      img: require("../assets/images/store/silknshine.jpg"),
      name: "Smart Heart",
    },
    {
      id: 74,
      img: require("../assets/images/store/maybeline.jpg"),
      name: "Maybelline Newyork Myanmar",
      route: "Maybelline",
    },
  ],
  getCategories: () => [
    {
      img: require("../assets/dummy/products/cola.png"),
      name: "Necafe Blend fire",
    },
    {
      img: require("../assets/dummy/products/monitor.jpeg"),
      name: "Fair & Lovely Multi Cream",
    },
    {
      img: require("../assets/dummy/products/nes.jpeg"),
      name: "Necafe Blend fire",
    },
    {
      id: 9,
      img: require("../assets/dummy/products/ovaltine.jpeg"),
      name: "Necafe Blend fire",
    },
    {
      img: require("../assets/dummy/products/cola.png"),
      name: "Fair & Lovely Multi Cream",
    },
    {
      img: require("../assets/dummy/products/nes.jpeg"),
      name: "Necafe Blend fire",
    },
  ],
  moneyFormat: (amount) => {
    let money = Number(amount)
      .toString()
      .replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
    return money;
  },
  getMallCat: () => [
    {
      logo: require("../assets/images/mall_icons/tomato_malls/1.png"),
      name: "TOMATO Malls",
      route: "TomatoMall",
    },
    {
      logo: require("../assets/images/mall_icons/flash_deals/1.png"),
      name: "Flash Deals",
    },
    {
      logo: require("../assets/images/mall_icons/mega_sales/1.png"),
      name: "Mega Sales",
      route: "MegaSaleMall",
    },
    {
      logo: require("../assets/images/mall_icons/tomato_points/1.png"),
      name: "TOMATO Points",
    },
    {
      logo: require("../assets/images/mall_icons/tomato_coins/1.png"),
      name: "TOMATO Reward Coins",
    },
    {
      logo: require("../assets/images/mall_icons/tomato_mart/1.png"),
      name: "TOMATO Mart",
      route: "TomatoMart",
    },
    {
      logo: require("../assets/images/mall_icons/beauty_mall/1.png"),
      name: "Beauty Mall",
      route: "BeautyMall",
    },
    {
      logo: require("../assets/images/mall_icons/electric_mall/1.png"),
      name: "Electronic Mall",
      route: "ElectronicMall",
    },
    {
      logo: require("../assets/images/mall_icons/kids_mall/1.png"),
      name: "Kids & Babies Mall",
      route: "KidsMall",
    },
    {
      logo: require("../assets/images/mall_icons/fashion_mall/1.png"),
      name: "Fashion Mall",
      route: "TomatoMall",
    },
  ],
  getMartCat: () => [
    { logo: require("../assets/images/2.png"), name: "Flash Deals" },
    { logo: require("../assets/images/11.png"), name: "Promotions Items" },
    { logo: require("../assets/images/9.png"), name: "Top Products" },
    { logo: require("../assets/images/28.png"), name: "Drink & Beverages" },
    { logo: require("../assets/images/6.png"), name: "Groceries & Kitchen" },
    { logo: require("../assets/images/27.png"), name: "Snacks" },
    { logo: require("../assets/images/43.jpg"), name: "Kitchen Essentials" },
    { logo: require("../assets/images/28.png"), name: "Beer & Alcohols" },
    { logo: require("../assets/images/23.png"), name: "Kitchen Categoreis" },
    { logo: require("../assets/images/17.png"), name: "Discover Mall" },
  ],
  getBeautyCat: () => [
    {
      logo: require("../assets/images/mall_icons/buy_together/1.png"),
      name: "Buy Together",
    },
    {
      logo: require("../assets/images/mall_icons/flash_deals/1.png"),
      name: "Flash Deals",
    },
    {
      logo: require("../assets/images/mall_icons/hot_products/1.png"),
      name: "Hot Products",
    },
    { logo: require("../assets/images/12.png"), name: "Top brands" },
    {
      logo: require("../assets/images/mall_icons/beauty_mall/1.png"),
      name: "Makeup & Cosmetic",
    },
    { logo: require("../assets/images/13.png"), name: "Skin Care" },
    { logo: require("../assets/images/14.png"), name: "Bath & Body" },
    { logo: require("../assets/images/15.png"), name: "Official Store" },
    { logo: require("../assets/images/16.png"), name: "Beauty Categoreis" },
    { logo: require("../assets/images/17.png"), name: "Discover Mall" },
  ],
  getKitchenCat: () => [
    { logo: require("../assets/images/11.png"), name: "Buy Together" },
    { logo: require("../assets/images/2.png"), name: "Flash Deals" },
    { logo: require("../assets/images/18.png"), name: "Kitchen Mush Have" },
    { logo: require("../assets/images/19.png"), name: "Meats" },
    { logo: require("../assets/images/20.png"), name: "Vegetables" },
    { logo: require("../assets/images/20.png"), name: "Fruits" },
    { logo: require("../assets/images/21.png"), name: "Groceries & Kitchen" },
    { logo: require("../assets/images/22.png"), name: "Beverages & Drinks" },
    { logo: require("../assets/images/23.png"), name: "Kitchen Categories" },
    { logo: require("../assets/images/24.png"), name: "Discover Mall" },
  ],
  getBeautyCat: () => [
    { logo: require("../assets/images/11.png"), name: "Buy Together" },
    { logo: require("../assets/images/2.png"), name: "Flash Deals" },
    { logo: require("../assets/images/9.png"), name: "Hot Products" },
    { logo: require("../assets/images/12.png"), name: "Top brands" },
    { logo: require("../assets/images/7.png"), name: "Makeup & Cosmeti" },
    { logo: require("../assets/images/13.png"), name: "Skin Care" },
    { logo: require("../assets/images/14.png"), name: "Bath & Body" },
    { logo: require("../assets/images/15.png"), name: "Official Store" },
    { logo: require("../assets/images/16.png"), name: "Beauty Categoreis" },
    { logo: require("../assets/images/17.png"), name: "Discover Mall" },
  ],
  geteElecronicCat: () => [
    { logo: require("../assets/images/11.png"), name: "Buy Together" },
    { logo: require("../assets/images/2.png"), name: "Flash Deals" },
    { logo: require("../assets/images/9.png"), name: "Hot Items" },
    { logo: require("../assets/images/25.png"), name: "Top Brands" },
    { logo: require("../assets/images/26.png"), name: "New Arrivals" },
    { logo: require("../assets/images/8.png"), name: "Computer & Laptops" },
    { logo: require("../assets/images/7.png"), name: "Home Electronic" },
    { logo: require("../assets/images/15.png"), name: "Official Store" },
    { logo: require("../assets/images/24.png"), name: "Electronic Categoreis" },
    { logo: require("../assets/images/17.png"), name: "Discover Mall" },
  ],
  getZayCat: () => [
    { logo: require("../assets/images/11.png"), name: "Buy Together" },
    {
      logo: require("../assets/images/mall_icons/flash_deals/1.png"),
      name: "Flash Deals",
    },
    { logo: require("../assets/images/18.png"), name: "Must-have Items" },
    { logo: require("../assets/images/9.png"), name: "Best Selling Brands" },
    { logo: require("../assets/images/1.png"), name: "Tomato Kitchen" },
    { logo: require("../assets/images/27.png"), name: "Beverages" },
    { logo: require("../assets/images/28.png"), name: "Beer & Wine" },
    { logo: require("../assets/images/15.png"), name: "Official Store" },
    { logo: require("../assets/images/29.png"), name: "Zay Categoreis" },
    { logo: require("../assets/images/17.png"), name: "Discover Zay" },
  ],
  getKidsCat: () => [
    { logo: require("../assets/images/11.png"), name: "Buy Together" },
    { logo: require("../assets/images/2.png"), name: "Flash Deals" },
    { logo: require("../assets/images/3.png"), name: "Recommended" },
    { logo: require("../assets/images/9.png"), name: "Top Brands" },
    {
      logo: require("../assets/images/31.png"),
      name: "Nutrition & Milk Formula",
    },
    { logo: require("../assets/images/24.png"), name: "Kids Bath & Body Care" },
    { logo: require("../assets/images/32.png"), name: "Kids Apparels" },
    { logo: require("../assets/images/15.png"), name: "Official Store" },
    { logo: require("../assets/images/33.png"), name: "Kids Categoreis" },
    { logo: require("../assets/images/34.png"), name: "Discover Mall" },
  ],
  getPetCat: () => [
    { logo: require("../assets/images/36.png"), name: "Must-have-items" },
    { logo: require("../assets/images/9.png"), name: "Top Brands" },
    { logo: require("../assets/images/37.png"), name: "Pet Food" },
    { logo: require("../assets/images/38.png"), name: "Pet Snacks" },
    { logo: require("../assets/images/39.png"), name: "Pet Fashions" },
    { logo: require("../assets/images/40.png"), name: "Pet Grooming" },
    { logo: require("../assets/images/41.png"), name: "Pet Medicines" },
    {
      logo: require("../assets/images/mall_icons/pet_mall/1.png"),
      name: "Pet Accessories",
    },
    { logo: require("../assets/images/6.png"), name: "Pet Categoreis" },
    { logo: require("../assets/images/34.png"), name: "Discover Mall" },
  ],
  getInspiredTrends: () => [
    {
      id: "407",
      name: "Makeup & Cosmetics",
      image: require("../assets/images/inspired_trends/make_up.jpg"),
    },
    {
      id: "429",
      name: "Bath & Body",
      image: require("../assets/images/inspired_trends/bath_and_body.jpg"),
    },
    {
      id: "2840",
      name: "Beauty Masks",
      image: require("../assets/images/inspired_trends/beauty_mask.jpg"),
    },
    {
      id: "CategoryTab",
      name: "Food & Beverages",
      image: require("../assets/images/inspired_trends/food_and_beverage.jpg"),
    },
    {
      id: "CategoryTab",
      name: "Groceries & Kitchen",
      image: require("../assets/images/inspired_trends/kitchen.png"),
    },
    {
      id: "CategoryTab",
      name: "Kids Nutrition & Milk Formula",
      image: require("../assets/images/inspired_trends/kid.jpg"),
    },
    {
      id: "CategoryTab",
      name: "Pet Food & Supplies",
      image: require("../assets/images/inspired_trends/pet.png"),
    },
  ],

  getStoresCatIcons: () => [
    { logo: require("../assets/images/30.png"), name: "Store" },
    { logo: require("../assets/images/21.png"), name: "Products" },
    { logo: require("../assets/images/29.png"), name: "Categories" },
    { logo: require("../assets/images/2.png"), name: "Flash Deals" },
    { logo: require("../assets/images/36.png"), name: "Promotions" },
  ],

  shippingCost: (state, region) => {
    if (state == 7 || state == "Yangon") {
      if (ygn2kregion.includes(region)) {
        return 2000;
      } else if (ygn25kregion.includes(region)) {
        return 2500;
      } else if (ygn30kregion.includes(region)) {
        return 3000;
      } else if (ygn40kregion.includes(region)) {
        return 4000;
      } else {
        return 3000;
      }
    }
    return 4000;
  },

  calculateExtraWeight: (weight, weight_unit) => {
    let _tmpPrice = 0;
    let _tmpWeight = 0;

    if (weight_unit === "kg") {
      _tmpWeight = weight;
    } else if (weight_unit === "g") {
      _tmpWeight = weight / 1000;
    }

    if (weight) {
      // for total weight is above 3 kg
      if (_tmpWeight - 3 > 1) {
        // for over weight is below n.5 kg (eg: 1.1 kg to 1.4 kg)
        if (Math.round(_tmpWeight - 3) < Math.floor(_tmpWeight - 2)) {
          _tmpPrice = Math.floor(_tmpWeight - 2) * 500;
        }
        // for over weight is above n.4 kg (eg: 1.5 kg to 1.9 kg)
        else {
          _tmpPrice = Math.round(_tmpWeight - 3) * 500;
        }
      }
      // for total weight is 3 kg
      else {
        _tmpPrice = 500;
      }
    }

    return _tmpPrice;
  },

  setStatusBarToNormal: (StatusBar) => {
    if (Platform.OS === "android") {
      StatusBar.setTranslucent(false);
      StatusBar.setBackgroundColor(THEME.primary);
    }
  },

  getOfficialStoresId: (name) => {
    let _tmp = OfficialStores.filter((os) => {
      if (name == os.name) {
        return os;
      }
    });

    if (_tmp.length) {
      return _tmp[0].id;
    } else {
      return null;
    }
  },
  getOfficialStoreRoute: (store) => {
    let _temp = OfficialStores.filter((os) => {
      if (store.id == os.id || store.name == os.name) {
        return os;
      }
    });

    if (_temp.length) {
      return _temp[0];
    }
    return null;
  },

  getDemyProducts: () => [
    {
      name: "Product 1",
      price: "1000",
    },
    {
      name: "Product 2",
      price: "4300",
    },
    {
      name: "Product 3",
      price: "14000",
    },
    {
      name: "Product 4",
      price: "1600",
    },
    {
      name: "Product 5",
      price: "820000",
    },
    {
      name: "Product 6",
      price: "34000",
    },
  ],
};
