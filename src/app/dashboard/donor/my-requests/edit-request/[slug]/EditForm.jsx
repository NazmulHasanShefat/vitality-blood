"use client";

import { updateDonationRequest } from "@/lib/actions/donationRequest";
import { toast } from "@heroui/react";
import { redirect } from "next/navigation";
import React, { useState } from "react";
import {
  FiUser,
  FiDroplet,
  FiMapPin,
  FiCalendar,
  FiClock,
  FiMessageSquare,
  FiCheckCircle,
  FiArrowLeft,
  FiMail,
  FiBriefcase,
} from "react-icons/fi";

// Location Data Arrays and Objects
const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

const divisions = ["Dhaka", "Chattogram", "Rajshahi", "Khulna", "Sylhet", "Barishal", "Rangpur", "Mymensingh"];

const divisionsWithDistricts = {
  Dhaka: ["Dhaka", "Gazipur", "Narayanganj", "Tangail", "Faridpur", "Gopalganj", "Kishoreganj", "Madaripur", "Manikganj", "Munshiganj", "Narsingdi", "Rajbari", "Shariatpur"],
  Chattogram: ["Chattogram", "Cox's Bazar", "Cumilla", "Feni", "Brahmanbaria", "Rangamati", "Khagrachhari", "Bandarban", "Noakhali", "Lakshmipur", "Chandpur"],
  Rajshahi: ["Rajshahi", "Bogra", "Joypurhat", "Naogaon", "Natore", "Nawabganj", "Pabna", "Sirajganj"],
  Khulna: ["Khulna", "Bagerhat", "Jessore", "Jhenaidah", "Magura", "Narail", "Satkhira", "Chuadanga", "Meherpur"],
  Sylhet: ["Sylhet", "Habiganj", "Moulvibazar", "Sunamganj"],
  Barishal: ["Barishal", "Barguna", "Bhola", "Jhalokati", "Patuakhali", "Pirojpur"],
  Rangpur: ["Rangpur", "Dinajpur", "Gaibandha", "Kurigram", "Lalmonirhat", "Nilphamari", "Panchagarh", "Thakurgaon"],
  Mymensingh: ["Mymensingh", "Netrokona", "Sherpur", "Jamalpur"]
};

const upazilas = {
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
  Rajshahi: ["Boalia", "Matihar", "Shah Makhdum", "Paba", "Godagari", "Tanore", "Bagha", "Charghat", "Durgapur", "Puthia", "Mohanpur"],
  Bogra: ["Bogra Sadar", "Shajahanpur", "Kahaloo", "Nandigram", "Sariakandi", "Sherpur", "Sonavatala", "Dhunat", "Gabtali", "Adamdighi", "Dupchanchia", "Shibganj"],
  Joypurhat: ["Joypurhat Sadar", "Akkelpur", "Kalai", "Khetlal", "Panchbibi"],
  Naogaon: ["Naogaon Sadar", "Atrai", "Badalgachhi", "Dhamoirhat", "Manda", "Mahadevpur", "Niamatpur", "Patnitala", "Porsha", "Raninagar", "Sapahar"],
  Natore: ["Natore Sadar", "Baraigram", "Bagatipara", "Gurudaspur", "Lalpur", "Singra", "Naldanga"],
  Nawabganj: ["Nawabganj Sadar", "Bholahat", "Gomastapur", "Nachole", "Shibganj"],
  Pabna: ["Pabna Sadar", "Atgharia", "Bera", "Bhangura", "Chatmohar", "Faridpur", "Ishwardi", "Santhia", "Sujanagar"],
  Sirajganj: ["Sirajganj Sadar", "Belkuchi", "Chauhali", "Kamarkhanda", "Kazipur", "Raiganj", "Shahjadpur", "Tarash", "Ullahpara"],
  Khulna: ["Khulna Sadar", "Batiaghata", "Dacope", "Dumuria", "Dighalia", "Koyra", "Paikgachha", "Phultala", "Rupa"],
  Bagerhat: ["Bagerhat Sadar", "Chitalmari", "Fakirhat", "Kachua", "Mollahat", "Mongla", "Morrelganj", "Rampal", "Sarankhola"],
  Jessore: ["Jessore Sadar", "Abhaynagar", "Bagherpara", "Chougachha", "Jhikargachha", "Keshabpur", "Manirampur", "Sharsha"],
  Jhenaidah: ["Jhenaidah Sadar", "Harinakunda", "Kaliganj", "Kotchandpur", "Maheshpur", "Shailkupa"],
  Magura: ["Magura Sadar", "Mohammadpur", "Shalikha", "Sreepur"],
  Narail: ["Narail Sadar", "Lohagara", "Kalia"],
  Satkhira: ["Satkhira Sadar", "Assasuni", "Debhata", "Kalaroa", "Kaliganj", "Shyamnagar", "Tala"],
  Chuadanga: ["Chuadanga Sadar", "Alamdanga", "Damurhuda", "Jibannagar"],
  Meherpur: ["Meherpur Sadar", "Gangni", "Mujibnagar"],
  Sylhet: ["Sylhet Sadar", "Beanibazar", "Bishwanath", "Fenchuganj", "Golapganj", "Gowainghat", "Jaintiapur", "Kanaighat", "Balaganj", "Companyganj", "Zakiganj", "South Surma", "Osmaninagar"],
  Habiganj: ["Habiganj Sadar", "Bahubal", "Baniyachong", "Chunarughat", "Madhabpur", "Nabiganj", "Lakhai", "Ajmiriganj", "Shayestaganj"],
  Moulvibazar: ["Moulvibazar Sadar", "Barlekha", "Kamalganj", "Kulaura", "Rajnagar", "Sreemangal", "Juri"],
  Sunamganj: ["Sunamganj Sadar", "Bishwambharpur", "Chhatak", "Derai", "Dharampasha", "Dowarabazar", "Jagannathpur", "Jamalganj", "Sullah", "Tahirpur", "Shantiganj"],
  Barishal: ["Barishal Sadar", "Bakerganj", "Babuganj", "Wazirpur", "Banaripara", "Gournadi", "Agailjhara", "Mehendiganj", "Muladi", "Hizla"],
  Barguna: ["Barguna Sadar", "Amtali", "Bamna", "Betagi", "Patharghata", "Taltali"],
  Bhola: ["Bhola Sadar", "Burhanuddin", "Char Fasson", "Daulatkhan", "Monpura", "Lalmohan", "Tazumuddin"],
  Jhalokati: ["Jhalokati Sadar", "Kathalia", "Nalchity", "Rajapur"],
  Patuakhali: ["Patuakhali Sadar", "Bauphal", "Dashmina", "Galachipa", "Kalapara", "Mirzaganj", "Dumki", "Rangabali"],
  Pirojpur: ["Pirojpur Sadar", "Bhandaria", "Kawkhali", "Mathbaria", "Nazirpur", "Nesarabad", "Indurkani"],
  Rangpur: ["Rangpur Sadar", "Badarganj", "Gangachara", "Kaunia", "Mithapukur", "Pirgachha", "Pirganj", "Taraganj"],
  Dinajpur: ["Dinajpur Sadar", "Birganj", "Biral", "Bochaganj", "Chirirbandar", "Phulbari", "Ghoraghat", "Hakimpur", "Kaharole", "Khansama", "Nawabganj", "Parbatipur", "Birol"],
  Gaibandha: ["Gaibandha Sadar", "Gobindaganj", "Palashbari", "Sadullapur", "Saghata", "Sundarganj", "Phulchhari"],
  Kurigram: ["Kurigram Sadar", "Bhurungamari", "Chilmari", "Phulbari", "Rajarhat", "Rajibpur", "Roumari", "Nageshwari", "Ulipur"],
  Lalmonirhat: ["Lalmonirhat Sadar", "Aditmari", "Hatibandha", "Kaliganj", "Patgram"],
  Nilphamari: ["Nilphamari Sadar", "Saidpur", "Jaldhaka", "Kishoreganj", "Domar", "Dimla"],
  Panchagarh: ["Panchagarh Sadar", "Boda", "Debiganj", "Tetulia", "Atwari"],
  Thakurgaon: ["Thakurgaon Sadar", "Baliadangi", "Haripur", "Ranisankail", "Pirganj"],
  Mymensingh: ["Mymensingh Sadar", "Bhaluka", "Gauripur", "Haluaghat", "Ishwarganj", "Muktagachha", "Nandail", "Phulpur", "Trishal", "Phulbaria", "Gaffargaon", "Dhobaura", "TaraKanda"],
  Netrokona: ["Netrokona Sadar", "Atpara", "Barhatta", "Durgapur", "Khaliajuri", "Kalmakanda", "Kendua", "Madan", "Mohanganj", "Purbadhala"],
  Sherpur: ["Sherpur Sadar", "Jhenaidati", "Nakla", "Nalitabari", "Sreebardi"],
  Jamalpur: ["Jamalpur Sadar", "Baxiganj", "Dewanganj", "Isampur", "Madarganj", "Melandaha", "Sarishabari"]
};

export default function DonationRequestEditForm({ donationDetails, user }) {
  const formData = { ...donationDetails };

  // States for handling conditional cascading dropdowns
  const [selectedDivision, setSelectedDivision] = useState(formData.recipientDivision || "");
  const [selectedDistrict, setSelectedDistrict] = useState(formData.recipientDistrict || "");
  const [selectedUpazila, setSelectedUpazila] = useState(formData.recipientUpazila || "");

  // Reset district and upazila when division changes
  const handleDivisionChange = (e) => {
    setSelectedDivision(e.target.value);
    setSelectedDistrict("");
    setSelectedUpazila("");
  };

  // Reset upazila when district changes
  const handleDistrictChange = (e) => {
    setSelectedDistrict(e.target.value);
    setSelectedUpazila("");
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    const formEntries = new FormData(e.currentTarget);
    const updatedPayload = Object.fromEntries(formEntries.entries());
    const filterId = donationDetails?._id;
    
    const result = await updateDonationRequest(updatedPayload, filterId);
    console.log(result, "this is submission result");
    
    if (result.matchedCount) {
      toast.success("request updated successfully");
      redirect(`/dashboard/${user?.role}/my-requests`);
    }
    console.log("Updated Payload:", updatedPayload);
  };

  const inputClass =
    "w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#1e293b] !text-gray-900 dark:text-slate-100 placeholder-gray-400 dark:placeholder-gray-500 focus:ring-2 focus:ring-red-500/20 focus:border-[#b91c1c] outline-none transition text-sm";

  const selectClass =
    "w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-300 dark:border-gray-700 bg-white !text-gray-900 dark:bg-[#1e293b] dark:text-slate-100 focus:ring-2 focus:ring-red-500/20 focus:border-[#b91c1c] outline-none transition appearance-none text-sm";

  const labelClass = "block text-sm font-semibold mb-2 !text-gray-900 dark:text-gray-300";

  const disabledInputClass =
    "w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-[#1e293b]/20 text-gray-500 dark:text-gray-500 outline-none cursor-not-allowed font-medium text-sm";

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 py-10 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
      <div className="max-w-3xl mx-auto">

        {/* Back Button */}
        <button
          type="button"
          onClick={() => window.history.back()}
          className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100 mb-6 transition"
        >
          <FiArrowLeft className="text-base" /> Back to Dashboard
        </button>

        {/* Card */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800/80 rounded-3xl shadow-xl overflow-hidden">

          {/* Header */}
          <div className="p-8 border-b border-slate-100 dark:border-slate-800/60 bg-gradient-to-b from-slate-50 to-transparent dark:from-slate-900/40">
            <h1 className="text-2xl font-black tracking-tight text-red-700">
              Update Donation Request
            </h1>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 font-medium">
              Modify the existing parameters for this emergency tracking session securely.
            </p>
          </div>

          <form onSubmit={handleUpdateSubmit} className="p-8 space-y-6">

            {/* Section 1: Requester Details (Read-Only) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className={labelClass}>Requester Name (Logged In)</label>
                <div className="relative">
                  <FiUser className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />
                  <input
                    type="text"
                    value={formData.requesterName}
                    disabled
                    className={disabledInputClass}
                  />
                </div>
              </div>

              <div>
                <label className={labelClass}>Requester Email (Logged In)</label>
                <div className="relative">
                  <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />
                  <input
                    type="email"
                    value={user?.email}
                    disabled
                    className={disabledInputClass}
                  />
                </div>
              </div>
            </div>

            {/* Section 2: Recipient Name & Blood Group */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label htmlFor="recipientName" className={labelClass}>Recipient Name</label>
                <div className="relative">
                  <FiUser className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />
                  <input
                    type="text"
                    id="recipientName"
                    name="recipientName"
                    required
                    defaultValue={formData.recipientName}
                    placeholder="Patient Full Name"
                    className={inputClass}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="bloodGroup" className={labelClass}>Required Blood Group</label>
                <div className="relative">
                  <FiDroplet className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg z-10" />
                  <select
                    id="bloodGroup"
                    name="bloodGroup"
                    required
                    defaultValue={formData.bloodGroup}
                    className={selectClass}
                  >
                    <option value="" disabled className="bg-white !text-gray-900 dark:bg-[#111827] dark:text-slate-100">
                      Select Blood Group
                    </option>
                    {bloodGroups.map((group) => (
                      <option key={group} value={group} className="bg-white !text-gray-900 dark:bg-[#111827] dark:text-slate-100">
                        {group}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Section 3: Cascading Address Fields (Division -> District -> Upazila) */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              {/* Division Selector */}
              <div>
                <label htmlFor="recipientDivision" className={labelClass}>Recipient Division</label>
                <div className="relative">
                  <FiMapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg z-10" />
                  <select
                    id="recipientDivision"
                    name="recipientDivision"
                    required
                    value={selectedDivision}
                    onChange={handleDivisionChange}
                    className={selectClass}
                  >
                    <option value="" disabled className="bg-white !text-gray-900 dark:bg-[#111827] dark:text-slate-100">
                      Select Division
                    </option>
                    {divisions.map((division) => (
                      <option key={division} value={division} className="bg-white !text-gray-900 dark:bg-[#111827] dark:text-slate-100">
                        {division}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* District Selector */}
              <div>
                <label htmlFor="recipientDistrict" className={labelClass}>Recipient District</label>
                <div className="relative">
                  <FiMapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg z-10" />
                  <select
                    id="recipientDistrict"
                    name="recipientDistrict"
                    required
                    disabled={!selectedDivision}
                    value={selectedDistrict}
                    onChange={handleDistrictChange}
                    className={`${selectClass} disabled:opacity-50 disabled:cursor-not-allowed`}
                  >
                    <option value="" disabled className="bg-white !text-gray-900 dark:bg-[#111827] dark:text-slate-100">
                      Select District
                    </option>
                    {selectedDivision &&
                      divisionsWithDistricts[selectedDivision]?.map((district) => (
                        <option key={district} value={district} className="bg-white !text-gray-900 dark:bg-[#111827] dark:text-slate-100">
                          {district}
                        </option>
                      ))}
                  </select>
                </div>
              </div>

              {/* Upazila Selector */}
              <div>
                <label htmlFor="recipientUpazila" className={labelClass}>Recipient Upazila</label>
                <div className="relative">
                  <FiMapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg z-10" />
                  <select
                    id="recipientUpazila"
                    name="recipientUpazila"
                    required
                    disabled={!selectedDistrict}
                    value={selectedUpazila}
                    onChange={(e) => setSelectedUpazila(e.target.value)}
                    className={`${selectClass} disabled:opacity-50 disabled:cursor-not-allowed`}
                  >
                    <option value="" disabled className="bg-white !text-gray-900 dark:bg-[#111827] dark:text-slate-100">
                      Select Upazila
                    </option>
                    {selectedDistrict &&
                      upazilas[selectedDistrict]?.map((upazila) => (
                        <option key={upazila} value={upazila} className="bg-white !text-gray-900 dark:bg-[#111827] dark:text-slate-100">
                          {upazila}
                        </option>
                      ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Section 4: Hospital Name & Full Address */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label htmlFor="hospitalName" className={labelClass}>Hospital Name</label>
                <div className="relative">
                  <FiBriefcase className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />
                  <input
                    type="text"
                    id="hospitalName"
                    name="hospitalName"
                    required
                    defaultValue={formData.hospitalName}
                    placeholder="e.g. Dhaka Medical College Hospital"
                    className={inputClass}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="fullAddress" className={labelClass}>Full Address Line</label>
                <div className="relative">
                  <FiMapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />
                  <input
                    type="text"
                    id="fullAddress"
                    name="fullAddress"
                    required
                    defaultValue={formData.fullAddress}
                    placeholder="e.g. Zahir Raihan Rd, Dhaka"
                    className={inputClass}
                  />
                </div>
              </div>
            </div>

            {/* Section 5: Donation Date & Time */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label htmlFor="donationDate" className={labelClass}>Donation Date</label>
                <div className="relative">
                  <FiCalendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />
                  <input
                    type="date"
                    id="donationDate"
                    name="donationDate"
                    required
                    defaultValue={formData.donationDate}
                    className={inputClass}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="donationTime" className={labelClass}>Donation Time</label>
                <div className="relative">
                  <FiClock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />
                  <input
                    type="time"
                    id="donationTime"
                    name="donationTime"
                    required
                    defaultValue={formData.donationTime}
                    className={inputClass}
                  />
                </div>
              </div>
            </div>

            {/* Section 6: Request Message */}
            <div>
              <label htmlFor="requestMessage" className={labelClass}>Request Message (Details)</label>
              <div className="relative">
                <FiMessageSquare className="absolute left-3 top-4 text-gray-400 text-lg" />
                <textarea
                  id="requestMessage"
                  name="requestMessage"
                  required
                  rows={4}
                  defaultValue={formData.requestMessage}
                  placeholder="Explain in detail why blood is required, patient clinical state, or specific emergency notes..."
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#1e293b] !text-gray-900 dark:text-slate-100 placeholder-gray-400 dark:placeholder-gray-500 focus:ring-2 focus:ring-red-500/20 focus:border-[#b91c1c] outline-none transition text-sm resize-none"
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-4 border-t border-slate-100 dark:border-slate-800/80 flex justify-end items-center gap-4">
              <button
                type="button"
                onClick={() => window.history.back()}
                className="px-5 py-2.5 text-sm font-medium bg-slate-100 hover:bg-slate-200 text-slate-700 dark:bg-slate-800 dark:hover:bg-slate-700 dark:text-slate-200 rounded-xl transition duration-200 active:scale-95"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="inline-flex items-center gap-2 bg-[#b91c1c] hover:bg-[#991b1b] text-white font-bold px-6 py-2.5 rounded-xl text-sm shadow-md shadow-red-500/10 transition duration-200 active:scale-95"
              >
                <FiCheckCircle className="text-base" /> Update Donation Request
              </button>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
}