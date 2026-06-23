export const divisions = ["Dhaka", "Chattogram", "Rajshahi", "Khulna", "Sylhet", "Barishal", "Rangpur", "Mymensingh"];

// বিভাগ অনুযায়ী ৬৪টি জেলার তালিকা
export const divisionsWithDistricts = {
  Dhaka: [
    "Dhaka", "Gazipur", "Narayanganj", "Tangail", "Faridpur", 
    "Gopalganj", "Kishoreganj", "Madaripur", "Manikganj", 
    "Munshiganj", "Narsingdi", "Rajbari", "Shariatpur"
  ],
  Chattogram: [
    "Chattogram", "Cox's Bazar", "Cumilla", "Feni", "Brahmanbaria", 
    "Rangamati", "Khagrachhari", "Bandarban", "Noakhali", 
    "Lakshmipur", "Chandpur"
  ],
  Rajshahi: [
    "Rajshahi", "Bogra", "Joypurhat", "Naogaon", "Natore", 
    "Nawabganj", "Pabna", "Sirajganj"
  ],
  Khulna: [
    "Khulna", "Bagerhat", "Jessore", "Jhenaidah", "Magura", 
    "Narail", "Satkhira", "Chuadanga", "Meherpur"
  ],
  Sylhet: [
    "Sylhet", "Habiganj", "Moulvibazar", "Sunamganj"
  ],
  Barishal: [
    "Barishal", "Barguna", "Bhola", "Jhalokati", "Patuakhali", "Pirojpur"
  ],
  Rangpur: [
    "Rangpur", "Dinajpur", "Gaibandha", "Kurigram", "Lalmonirhat", 
    "Nilphamari", "Panchagarh", "Thakurgaon"
  ],
  Mymensingh: [
    "Mymensingh", "Netrokona", "Sherpur", "Jamalpur"
  ]
};

// ১. বাংলাদেশের ৬৪টি জেলার তালিকা (Districts)
export const districts = [
  "Dhaka", "Chattogram", "Rajshahi", "Khulna", "Sylhet", "Barishal", "Rangpur", "Mymensingh",
  "Gazipur", "Narayanganj", "Tangail", "Faridpur", "Gopalganj", "Kishoreganj", "Madaripur", 
  "Manikganj", "Munshiganj", "Narsingdi", "Rajbari", "Shariatpur", "Cox's Bazar", "Cumilla", 
  "Feni", "Brahmanbaria", "Rangamati", "Khagrachhari", "Bandarban", "Noakhali", "Lakshmipur", 
  "Chandpur", "Bogra", "Joypurhat", "Naogaon", "Natore", "Nawabganj", "Pabna", "Sirajganj", 
  "Bagerhat", "Jessore", "Jhenaidah", "Magura", "Narail", "Satkhira", "Chuadanga", "Meherpur", 
  "Habiganj", "Moulvibazar", "Sunamganj", "Barguna", "Bhola", "Jhalokati", "Patuakhali", 
  "Pirojpur", "Dinajpur", "Gaibandha", "Kurigram", "Lalmonirhat", "Nilphamari", "Panchagarh", 
  "Thakurgaon", "Netrokona", "Sherpur", "Jamalpur"
];

// ২. জেলা অনুযায়ী উপজেলার তালিকা (Upazilas)
export const upazilas = {
  // ঢাকা বিভাগ
  Dhaka: ["Dhanmondi", "Mirpur", "Gulshan", "Uttara", "Shahbagh", "Savar", "Dhamrai", "Dohar", "Keraniganj", "Nawabganj"],
  Gazipur: ["Gazipur Sadar", "Kaliakair", "Kaliganj", "Kapasia", "Sreepur"],
  Narayanganj: ["Narayanganj Sadar", "Araihazar", "Bandar", "Rupganj", "Sonargaon"],
  Tangail: ["Tangail Sadar", "Basail", "Bhuapur", "Delduar", "Ghatail", "Gopalpur", "Kalihati", "Madhupur", "Mirzapur", "Nagarpur", "Sakhipur", "Dhanbari"],
  Faridpur: ["Faridpur Sadar", "Boalmari", "Alfadanga", "Madhukhali", "Bhanga", "Nagarkanda", "Charbhadrasan", "Sadarpur", "Saltha"],
  Gopalganj: ["Gopalganj Sadar", "Kashiani", "Kotalipara", "Muksudpur", "Tungipara"],
  Kishoreganj: ["Kishoreganj Sadar", "Itna", "Katiadi", "Bhairab", "Nikli", "Bajitpur", "Hossainpur", "Karimganj", "Kuliarchar", "Mithamain", "Pakundia", "Tarail"],
  Madaripur: ["Madaripur Sadar", "Kalkini", "Rajoir", "Shibchar"],
  Manikganj: ["Manikganj Sadar", "Singair", "Shibalaya", "Saturia", "Harirampur", "Ghior", "Daulatpur"],
  Munshiganj: ["Munshiganj Sadar", "Sreenagar", "Sirajdikhan", "Louhajang", "Tongibari", "Gajaria"],
  Narsingdi: ["Narsingdi Sadar", "Belabo", "Monohardi", "Palash", "Raipura", "Shibpur"],
  Rajbari: ["Rajbari Sadar", "Baliakandi", "Goalandaghat", "Pangsha", "Kalukhali"],
  Shariatpur: ["Shariatpur Sadar", "Damudya", "Naria", "Zajira", "Bhedarganj", "Gosairhat"],

  // চট্টগ্রাম বিভাগ
  Chattogram: ["Panchlaish", "Double Mooring", "Hathazari", "Anwara", "Patiya", "Rangunia", "Mirsarai", "Sitamunda", "Boalkhali", "Chandananish", "Lohagara", "Satkania", "Banshkhali", "Fatikchhari", "Sandwip"],
  "Cox's Bazar": ["Cox's Bazar Sadar", "Chakaria", "Maheshkhali", "Teknaf", "Ukhia", "Ramu", "Pekua", "Kutubdia"],
  Cumilla: ["Cumilla Sadar", "Barura", "Brahmanpara", "Burichang", "Chandina", "Chouddagram", "Daudkandi", "Debidwar", "Homna", "Laksam", "Muradnagar", "Nangalkot", "Titas", "Meghna", "Monohargonj", "Sadarsouth"],
  Feni: ["Feni Sadar", "Chagalnaiya", "Daganbhuiyan", "Parshuram", "Sonavazi", "Fulgazi"],
  Brahmanbaria: ["Brahmanbaria Sadar", "Ashuganj", "Nasirnagar", "Nabinagar", "Sarail", "Kasba", "Akhaura", "Bancharampur", "Bijoynagar"],
  Noakhali: ["Noakhali Sadar", "Begumganj", "Chatkhil", "Companyganj", "Hatiya", "Senbagh", "Sonaimuri", "Subarnachar", "Kabirhat"],
  Lakshmipur: ["Lakshmipur Sadar", "Raipur", "Ramganj", "Ramgati", "Kamalnagar"],
  Chandpur: ["Chandpur Sadar", "Hajiganj", "Kachua", "Faridganj", "Matlab North", "Matlab South", "Shahrasti", "Haimchar"],
  Rangamati: ["Rangamati Sadar", "Bagaichhari", "Barkal", "Kawkhali", "Belaichhari", "Kaptai", "Juraichhari", "Langadu", "Naniyarchar", "Rajasthali"],
  Khagrachhari: ["Khagrachhari Sadar", "Dighinala", "Lakshmichhari", "Mahalchhari", "Manikchhari", "Matiranga", "Panchhari", "Ramgarh"],
  Bandarban: ["Bandarban Sadar", "Thanchi", "Lama", "Naikhongchhari", "Ali Kadam", "Rowangchhari", "Ruma"],

  // রাজশাহী বিভাগ
  Rajshahi: ["Boalia", "Matihar", "Shah Makhdum", "Paba", "Godagari", "Tanore", "Bagha", "Charghat", "Durgapur", "Puthia", "Mohanpur"],
  Bogra: ["Bogra Sadar", "Shajahanpur", "Kahaloo", "Nandigram", "Sariakandi", "Sherpur", "Sonavatala", "Dhunat", "Gabtali", "Adamdighi", "Dupchanchia", "Shibganj"],
  Joypurhat: ["Joypurhat Sadar", "Akkelpur", "Kalai", "Khetlal", "Panchbibi"],
  Naogaon: ["Naogaon Sadar", "Atrai", "Badalgachhi", "Dhamoirhat", "Manda", "Mahadevpur", "Niamatpur", "Patnitala", "Porsha", "Raninagar", "Sapahar"],
  Natore: ["Natore Sadar", "Baraigram", "Bagatipara", "Gurudaspur", "Lalpur", "Singra", "Naldanga"],
  Nawabganj: ["Nawabganj Sadar", "Bholahat", "Gomastapur", "Nachole", "Shibganj"],
  Pabna: ["Pabna Sadar", "Atgharia", "Bera", "Bhangura", "Chatmohar", "Faridpur", "Ishwardi", "Santhia", "Sujanagar"],
  Sirajganj: ["Sirajganj Sadar", "Belkuchi", "Chauhali", "Kamarkhanda", "Kazipur", "Raiganj", "Shahjadpur", "Tarash", "Ullahpara"],

  // খুলনা বিভাগ
  Khulna: ["Khulna Sadar", "Batiaghata", "Dacope", "Dumuria", "Dighalia", "Koyra", "Paikgachha", "Phultala", "Rupa"],
  Bagerhat: ["Bagerhat Sadar", "Chitalmari", "Fakirhat", "Kachua", "Mollahat", "Mongla", "Morrelganj", "Rampal", "Sarankhola"],
  Jessore: ["Jessore Sadar", "Abhaynagar", "Bagherpara", "Chougachha", "Jhikargachha", "Keshabpur", "Manirampur", "Sharsha"],
  Jhenaidah: ["Jhenaidah Sadar", "Harinakunda", "Kaliganj", "Kotchandpur", "Maheshpur", "Shailkupa"], // Fixed syntax error & name here
  Magura: ["Magura Sadar", "Mohammadpur", "Shalikha", "Sreepur"],
  Narail: ["Narail Sadar", "Lohagara", "Kalia"],
  Satkhira: ["Satkhira Sadar", "Assasuni", "Debhata", "Kalaroa", "Kaliganj", "Shyamnagar", "Tala"],
  Chuadanga: ["Chuadanga Sadar", "Alamdanga", "Damurhuda", "Jibannagar"],
  Meherpur: ["Meherpur Sadar", "Gangni", "Mujibnagar"],

  // সিলেট বিভাগ
  Sylhet: ["Sylhet Sadar", "Beanibazar", "Bishwanath", "Fenchuganj", "Golapganj", "Gowainghat", "Jaintiapur", "Kanaighat", "Balaganj", "Companyganj", "Zakiganj", "South Surma", "Osmaninagar"],
  Habiganj: ["Habiganj Sadar", "Bahubal", "Baniyachong", "Chunarughat", "Madhabpur", "Nabiganj", "Lakhai", "Ajmiriganj", "Shayestaganj"],
  Moulvibazar: ["Moulvibazar Sadar", "Barlekha", "Kamalganj", "Kulaura", "Rajnagar", "Sreemangal", "Juri"],
  Sunamganj: ["Sunamganj Sadar", "Bishwambharpur", "Chhatak", "Derai", "Dharampasha", "Dowarabazar", "Jagannathpur", "Jamalganj", "Sullah", "Tahirpur", "Shantiganj"],

  // বরিশাল বিভাগ
  Barishal: ["Barishal Sadar", "Bakerganj", "Babuganj", "Wazirpur", "Banaripara", "Gournadi", "Agailjhara", "Mehendiganj", "Muladi", "Hizla"],
  Barguna: ["Barguna Sadar", "Amtali", "Bamna", "Betagi", "Patharghata", "Taltali"],
  Bhola: ["Bhola Sadar", "Burhanuddin", "Char Fasson", "Daulatkhan", "Monpura", "Lalmohan", "Tazumuddin"],
  Jhalokati: ["Jhalokati Sadar", "Kathalia", "Nalchity", "Rajapur"],
  Patuakhali: ["Patuakhali Sadar", "Bauphal", "Dashmina", "Galachipa", "Kalapara", "Mirzaganj", "Dumki", "Rangabali"],
  Pirojpur: ["Pirojpur Sadar", "Bhandaria", "Kawkhali", "Mathbaria", "Nazirpur", "Nesarabad", "Indurkani"],

  // রংপুর বিভাগ
  Rangpur: ["Rangpur Sadar", "Badarganj", "Gangachara", "Kaunia", "Mithapukur", "Pirgachha", "Pirganj", "Taraganj"],
  Dinajpur: ["Dinajpur Sadar", "Birganj", "Biral", "Bochaganj", "Chirirbandar", "Phulbari", "Ghoraghat", "Hakimpur", "Kaharole", "Khansama", "Nawabganj", "Parbatipur", "Birol"],
  Gaibandha: ["Gaibandha Sadar", "Gobindaganj", "Palashbari", "Sadullapur", "Saghata", "Sundarganj", "Phulchhari"],
  Kurigram: ["Kurigram Sadar", "Bhurungamari", "Chilmari", "Phulbari", "Rajarhat", "Rajibpur", "Roumari", "Nageshwari", "Ulipur"],
  Lalmonirhat: ["Lalmonirhat Sadar", "Aditmari", "Hatibandha", "Kaliganj", "Patgram"],
  Nilphamari: ["Nilphamari Sadar", "Saidpur", "Jaldhaka", "Kishoreganj", "Domar", "Dimla"],
  Panchagarh: ["Panchagarh Sadar", "Boda", "Debiganj", "Tetulia", "Atwari"],
  Thakurgaon: ["Thakurgaon Sadar", "Baliadangi", "Haripur", "Ranisankail", "Pirganj"],

  // ময়মনসিংহ বিভাগ
  Mymensingh: ["Mymensingh Sadar", "Bhaluka", "Gauripur", "Haluaghat", "Ishwarganj", "Muktagachha", "Nandail", "Phulpur", "Trishal", "Phulbaria", "Gaffargaon", "Dhobaura", "TaraKanda"],
  Netrokona: ["Netrokona Sadar", "Atpara", "Barhatta", "Durgapur", "Khaliajuri", "Kalmakanda", "Kendua", "Madan", "Mohanganj", "Purbadhala"],
  Sherpur: ["Sherpur Sadar", "Jhenaidati", "Nakla", "Nalitabari", "Sreebardi"],
  Jamalpur: ["Jamalpur Sadar", "Baxiganj", "Dewanganj", "Isampur", "Madarganj", "Melandaha", "Sarishabari"]
};