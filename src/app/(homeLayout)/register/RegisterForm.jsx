"use client";

import { authClient, signUp } from "@/lib/auth-client";
import { uploadImage } from "@/lib/uploads/imageUpload";
import { toast } from "@heroui/react";
import Link from "next/link";
import React, { useState } from "react";
import {
  FiUser,
  FiMail,
  FiLock,
  FiMapPin,
  FiDroplet,
  FiUploadCloud,
  FiEye,
  FiEyeOff,
  FiCheckCircle,
} from "react-icons/fi";

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    bloodGroup: "",
    district: "",
    upazila: "",
    password: "",
    confirmPassword: "",
  });

  const [avatarUrl, setAvatarUrl] = useState("fdsa");
  const [uploading, setUploading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
  const districts = [
    "Dhaka",
    "Chattogram",
    "Rajshahi",
    "Khulna",
    "Sylhet",
    "Barishal",
    "Rangpur",
    "Mymensingh",
  ];
  const upazilas = {
    Bagerhat: [
      "Bagerhat Sadar",
      "Chitalmari",
      "Fakirhat",
      "Kachua",
      "Mollahat",
      "Mongla",
      "Morrelganj",
      "Rampal",
      "Sarankhola",
    ],
    Bandarban: [
      "Alikadam",
      "Bandarban Sadar",
      "Lama",
      "Naikhongchhari",
      "Rowangchhari",
      "Ruma",
      "Thanchi",
    ],
    Barguna: [
      "Amtali",
      "Bamna",
      "Barguna Sadar",
      "Betagi",
      "Patharghata",
      "Taltali",
    ],
    Barishal: [
      "Agailjhara",
      "Babuganj",
      "Bakerganj",
      "Banaripara",
      "Barishal Sadar",
      "Gaurnadi",
      "Hizla",
      "Mehendiganj",
      "Muladi",
      "Wazirpur",
    ],
    Bhola: [
      "Bhola Sadar",
      "Burhanuddin",
      "Char Fasson",
      "Daulatkhan",
      "Lalmohan",
      "Manpura",
      "Tazumuddin",
    ],
    Bogura: [
      "Adamdighi",
      "Bogura Sadar",
      "Dhunat",
      "Dhupchanchia",
      "Gabtali",
      "Kahaloo",
      "Nandigram",
      "Sariakandi",
      "Shajahanpur",
      "Sherpur",
      "Shibganj",
      "Sonatala",
    ],
    Brahmanbaria: [
      "Akhaura",
      "Ashuganj",
      "Bancharampur",
      "Bijoynagar",
      "Brahmanbaria Sadar",
      "Kasba",
      "Nabinagar",
      "Nasirnagar",
      "Sarail",
    ],
    Chandpur: [
      "Chandpur Sadar",
      "Faridganj",
      "Haimchar",
      "Haziganj",
      "Kachua",
      "Matlab Dakshin",
      "Matlab Uttar",
      "Shahrasti",
    ],
    "Chapai Nawabganj": [
      "Bholahat",
      "Chapai Nawabganj Sadar",
      "Gomastapur",
      "Nachole",
      "Shibganj",
    ],
    Chattogram: [
      "Anwara",
      "Banshkhali",
      "Boalkhali",
      "Chandanaish",
      "Chattogram Sadar",
      "Fatikchhari",
      "Hathazari",
      "Karnaphuli",
      "Lohagara",
      "Mirsharai",
      "Patiya",
      "Rangunia",
      "Raozan",
      "Sandwip",
      "Satkania",
      "Sitakunda",
    ],
    Chuadanga: ["Alamdanga", "Chuadanga Sadar", "Damurhuda", "Jibannagar"],
    "Cox's Bazar": [
      "Chakaria",
      "Cox's Bazar Sadar",
      "Kutubdia",
      "Maheshkhali",
      "Pekua",
      "Ramu",
      "Teknaf",
      "Ukhia",
    ],
    Cumilla: [
      "Barura",
      "Brahmanpara",
      "Burichang",
      "Chandina",
      "Chauddagram",
      "Cumilla Adarsha Sadar",
      "Cumilla Sadar Dakshin",
      "Daudkandi",
      "Debidwar",
      "Homna",
      "Laksam",
      "Lalmai",
      "Meghna",
      "Monohorgonj",
      "Muradnagar",
      "Nangalkot",
      "Titas",
    ],
    Dhaka: ["Dhamrai", "Dohar", "Keraniganj", "Nawabganj", "Savar"],
    Dinajpur: [
      "Birampur",
      "Birganj",
      "Biral",
      "Bochaganj",
      "Chirirbandar",
      "Dinajpur Sadar",
      "Fulbari",
      "Ghoraghat",
      "Hakimpur",
      "Kaharole",
      "Khansama",
      "Nawabganj",
      "Parbatipur",
    ],
    Faridpur: [
      "Alfadanga",
      "Bhanga",
      "Boalmari",
      "Charbhadrasan",
      "Faridpur Sadar",
      "Madhukhali",
      "Nagarkanda",
      "Sadarpur",
      "Saltha",
    ],
    Feni: [
      "Chhagalnaiya",
      "Daganbhuiyan",
      "Feni Sadar",
      "Fulgazi",
      "Parshuram",
      "Sonagazi",
    ],
    Gaibandha: [
      "Fulchhari",
      "Gaibandha Sadar",
      "Gobindaganj",
      "Palashbari",
      "Sadullapur",
      "Saghata",
      "Sundarganj",
    ],
    Gazipur: ["Gazipur Sadar", "Kaliakair", "Kaliganj", "Kapasia", "Sreepur"],
    Gopalganj: [
      "Gopalganj Sadar",
      "Kashiani",
      "Kotalipara",
      "Muksudpur",
      "Tungipara",
    ],
    Habiganj: [
      "Ajmiriganj",
      "Baniachong",
      "Bahubal",
      "Chunarughat",
      "Habiganj Sadar",
      "Lakhai",
      "Madhabpur",
      "Nabiganj",
    ],
    Jamalpur: [
      "Bakshiganj",
      "Dewanganj",
      "Islampur",
      "Jamalpur Sadar",
      "Madarganj",
      "Melandaha",
      "Sarishabari",
    ],
    Jashore: [
      "Abhaynagar",
      "Bagherpara",
      "Chaugachha",
      "Jashore Sadar",
      "Jhikargachha",
      "Keshabpur",
      "Manirampur",
      "Sharsha",
    ],
    Jhalokati: ["Jhalokati Sadar", "Kathalia", "Nalchity", "Rajapur"],
    Jhenaidah: [
      "Harinakunda",
      "Jhenaidah Sadar",
      "Kaliganj",
      "Kotchandpur",
      "Maheshpur",
      "Shailkupa",
    ],
    Joypurhat: ["Akkelpur", "Joypurhat Sadar", "Kalai", "Khetlal", "Panchbibi"],
    Khagrachari: [
      "Baghaichhari",
      "Dighinala",
      "Guimara",
      "Khagrachari Sadar",
      "Lakshmichhari",
      "Mahalchhari",
      "Manikchhari",
      "Matiranga",
      "Panchhari",
      "Ramgarh",
    ],
    Khulna: [
      "Batiaghata",
      "Dacope",
      "Dighalia",
      "Dumuria",
      "Koyra",
      "Paikgachha",
      "Phultala",
      "Rupsa",
      "Terokhada",
    ],
    Kishoreganj: [
      "Austagram",
      "Bajitpur",
      "Bhairab",
      "Hossainpur",
      "Itna",
      "Karimganj",
      "Katiadi",
      "Kishoreganj Sadar",
      "Kuliarchar",
      "Mithamain",
      "Nikli",
      "Pakundia",
      "Tarail",
    ],
    Kurigram: [
      "Bhurungamari",
      "Char Rajibpur",
      "Chilmari",
      "Fulbari",
      "Kurigram Sadar",
      "Nageshwari",
      "Rajarhat",
      "Raumari",
      "Ulipur",
    ],
    Kushtia: [
      "Bheramara",
      "Daulatpur",
      "Khoksa",
      "Kumarkhali",
      "Kushtia Sadar",
      "Mirpur",
    ],
    Lakshmipur: [
      "Kamalnagar",
      "Lakshmipur Sadar",
      "Ramganj",
      "Ramgati",
      "Raipur",
    ],
    Lalmonirhat: [
      "Aditmari",
      "Hatibandha",
      "Kaliganj",
      "Lalmonirhat Sadar",
      "Patgram",
    ],
    Madaripur: ["Kalkini", "Madaripur Sadar", "Rajoir", "Shibchar"],
    Magura: ["Magura Sadar", "Mohammadpur", "Shalikha", "Sreepur"],
    Manikganj: [
      "Daulatpur",
      "Ghior",
      "Harirampur",
      "Manikganj Sadar",
      "Saturia",
      "Shivalaya",
      "Singair",
    ],
    Meherpur: ["Gangni", "Meherpur Sadar", "Mujibnagar"],
    Moulvibazar: [
      "Barlekha",
      "Juri",
      "Kamalganj",
      "Kulaura",
      "Moulvibazar Sadar",
      "Rajnagar",
      "Sreemangal",
    ],
    Munshiganj: [
      "Gazaria",
      "Louhajang",
      "Munshiganj Sadar",
      "Sirajdikhan",
      "Sreenagar",
      "Tongibari",
    ],
    Mymensingh: [
      "Bhaluka",
      "Dhobaura",
      "Fulbaria",
      "Gaffargaon",
      "Gauripur",
      "Haluaghat",
      "Ishwarganj",
      "Muktagachha",
      "Mymensingh Sadar",
      "Nandail",
      "Phulpur",
      "Trishal",
    ],
    Naogaon: [
      "Atrai",
      "Badalgachhi",
      "Dhamoirhat",
      "Manda",
      "Mahadebpur",
      "Naogaon Sadar",
      "Niamatpur",
      "Patnitala",
      "Porsha",
      "Raninagar",
      "Sapahar",
    ],
    Narail: ["Kalia", "Lohagara", "Narail Sadar"],
    Narayanganj: [
      "Araihazar",
      "Bandar",
      "Narayanganj Sadar",
      "Rupganj",
      "Sonargaon",
    ],
    Narsingdi: [
      "Belabo",
      "Monohardi",
      "Narsingdi Sadar",
      "Palash",
      "Raipura",
      "Shibpur",
    ],
    Natore: [
      "Bagatipara",
      "Baraigram",
      "Gurudaspur",
      "Lalpur",
      "Natore Sadar",
      "Singra",
    ],
    Netrokona: [
      "Atpara",
      "Barhatta",
      "Durgapur",
      "Kalmakanda",
      "Kendua",
      "Khaliajuri",
      "Madan",
      "Mohanganj",
      "Netrokona Sadar",
      "Purbadhala",
    ],
    Nilphamari: [
      "Dimla",
      "Domar",
      "Jaldhaka",
      "Kishoreganj",
      "Nilphamari Sadar",
      "Saidpur",
    ],
    Noakhali: [
      "Begumganj",
      "Chatkhil",
      "Companiganj",
      "Hatiya",
      "Kabir Hat",
      "Noakhali Sadar",
      "Senbagh",
      "Sonaimuri",
      "Subarna Char",
    ],
    Pabna: [
      "Atgharia",
      "Bera",
      "Bhangura",
      "Chatmohar",
      "Faridpur",
      "Ishwardi",
      "Pabna Sadar",
      "Santhia",
      "Sujanagar",
    ],
    Panchagarh: ["Atwari", "Boda", "Debiganj", "Panchagarh Sadar", "Tetulia"],
    Patuakhali: [
      "Bauphal",
      "Dashmina",
      "Dumki",
      "Galachipa",
      "Kalapara",
      "Mirzaganj",
      "Patuakhali Sadar",
      "Rangabali",
    ],
    Pirojpur: [
      "Bhandaria",
      "Kawkhali",
      "Mathbaria",
      "Nazirpur",
      "Nesarabad",
      "Pirojpur Sadar",
      "Zianagar",
    ],
    Rajbari: [
      "Baliakandi",
      "Goalandaghat",
      "Kalukhali",
      "Pangsha",
      "Rajbari Sadar",
    ],
    Rajshahi: [
      "Bagha",
      "Bagmara",
      "Charghat",
      "Durgapur",
      "Godagari",
      "Mohanpur",
      "Paba",
      "Puthia",
      "Rajshahi Sadar",
      "Tanore",
    ],
    Rangamati: [
      "Bagaichhari",
      "Barkal",
      "Belaichhari",
      "Juraichhari",
      "Kaptai",
      "Kawkhali",
      "Langadu",
      "Naniarchar",
      "Rajasthali",
      "Rangamati Sadar",
    ],
    Rangpur: [
      "Badarganj",
      "Gangachara",
      "Kaunia",
      "Mithapukur",
      "Pirgachha",
      "Pirganj",
      "Rangpur Sadar",
      "Taraganj",
    ],
    Satkhira: [
      "Assasuni",
      "Debhata",
      "Kalaroa",
      "Kaliganj",
      "Satkhira Sadar",
      "Shyamnagar",
      "Tala",
    ],
    Shariatpur: [
      "Bhedarganj",
      "Damudya",
      "Gosairhat",
      "Naria",
      "Shariatpur Sadar",
      "Zanjira",
    ],
    Sherpur: [
      "Jhenaigati",
      "Nakla",
      "Nalitabari",
      "Sherpur Sadar",
      "Sreebardi",
    ],
    Sirajganj: [
      "Belkuchi",
      "Chauhali",
      "Enayetpur",
      "Kamarkhand",
      "Kazipur",
      "Raiganj",
      "Shahjadpur",
      "Sirajganj Sadar",
      "Tarash",
      "Ullapara",
    ],
    Sunamganj: [
      "Bishwamvarpur",
      "Chhatak",
      "Derai",
      "Dharampasha",
      "Dowarabazar",
      "Jagannathpur",
      "Jamalganj",
      "Sulla",
      "Sunamganj Sadar",
      "Tahirpur",
    ],
    Sylhet: [
      "Balaganj",
      "Beanibazar",
      "Bishwanath",
      "Companiganj",
      "Fenchuganj",
      "Golapganj",
      "Gowainghat",
      "Jaintiapur",
      "Kanaighat",
      "Osmani Nagar",
      "South Surma",
      "Sylhet Sadar",
      "Zakiganj",
    ],
    Tangail: [
      "Basail",
      "Bhuapur",
      "Delduar",
      "Dhanbari",
      "Ghatail",
      "Gopalpur",
      "Kalihati",
      "Madhupur",
      "Mirzapur",
      "Nagarpur",
      "Sakhipur",
      "Tangail Sadar",
    ],
    Thakurgaon: [
      "Baliadangi",
      "Haripur",
      "Pirganj",
      "Ranisankail",
      "Thakurgaon Sadar",
    ],
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAvatarChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    setError("");

    const imageFormData = new FormData();
    imageFormData.append("image", file);

    try {
    //   const IMGBB_API_KEY = process.env.NEXT_PUBLIC_IMGBB_API_KEY;
    //   const response = await fetch(
    //     `https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`,
    //     {
    //       method: "POST",
    //       body: imageFormData,
    //     },
    //   );

    //   const data = await response.json();
    const data = await uploadImage(imageFormData);
    console.log(data)
      if (data.success) {
        setAvatarUrl(data.data.url);
        setSuccess("Avatar uploaded successfully!");
      } else {
        setError("Failed to upload image to Imgbb.");
      }
    } catch (err) {
      setError("Something went wrong during image upload.");
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    if (!avatarUrl) {
      setError("Please upload your avatar first.");
      return;
    }

    const { data, error } = await signUp.email({
      ...formData,
      image: avatarUrl,
      role: "donor",
      status: "active",
      callbackURL: "/login"
    });
    if(error){
        console.log("there is some error",error)
    }
    if(data){
      toast.success("registed successfully please login")
        console.log("submited successfullt",data)
    }

    console.log("Registration Data:", { ...formData, avatar: avatarUrl });
    setSuccess("Registration submitted successfully!");
  };
  return (
    <>
      {error && (
        <div className="mb-4 p-3 bg-red-50 dark:bg-red-950/30 text-red-600 dark:text-red-400 text-sm rounded-lg border border-red-200 dark:border-red-900/30 font-medium">
          {error}
        </div>
      )}
      {success && (
        <div className="mb-4 p-3 bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400 text-sm rounded-lg border border-emerald-200 dark:border-emerald-900/30 font-medium">
          {success}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* নাম ও ইমেইল */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold mb-1.5 text-gray-700 dark:text-gray-300">
              Full Name
            </label>
            <div className="relative">
              <FiUser className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />
              <input
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                placeholder="John Doe"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#1e293b] text-gray-800 dark:text-slate-100 focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold mb-1.5 text-gray-700 dark:text-gray-300">
              Email Address
            </label>
            <div className="relative">
              <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                placeholder="example@mail.com"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#1e293b] text-gray-800 dark:text-slate-100 focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition"
              />
            </div>
          </div>
        </div>

        {/* অবতার আপলোডার */}
        <div>
          <label className="block text-sm font-semibold mb-1.5 text-gray-700 dark:text-gray-300">
            User Avatar (via Imgbb)
          </label>
          <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 dark:border-gray-700 border-dashed rounded-xl hover:border-red-400 dark:hover:border-red-500 transition cursor-pointer relative bg-white dark:bg-[#1e293b]">
            <input
              type="file"
              accept="image/*"
              onChange={handleAvatarChange}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
            />
            <div className="space-y-1 text-center">
              {avatarUrl ? (
                <div className="flex flex-col items-center space-y-2">
                  <FiCheckCircle className="text-emerald-500 text-3xl animate-bounce" />
                  <p className="text-sm text-emerald-600 dark:text-emerald-400 font-medium">
                    Image uploaded safely!
                  </p>
                </div>
              ) : uploading ? (
                <div className="text-sm text-gray-500 dark:text-gray-400 font-medium animate-pulse">
                  Uploading to Imgbb... Please wait.
                </div>
              ) : (
                <>
                  <FiUploadCloud className="mx-auto h-10 w-10 text-gray-400" />
                  <div className="flex text-sm text-gray-600 dark:text-gray-400">
                    <span className="relative font-medium text-[#b91c1c] dark:text-[#ef4444]">
                      Upload a file
                    </span>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    PNG, JPG up to 5MB
                  </p>
                </>
              )}
            </div>
          </div>
        </div>

        {/* ব্লাড গ্রুপ ও ডিস্ট্রিক্ট */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold mb-1.5 text-gray-700 dark:text-gray-300">
              Blood Group
            </label>
            <div className="relative">
              <FiDroplet className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg z-10" />
              <select
                name="bloodGroup"
                required
                value={formData.bloodGroup}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-300 dark:border-gray-700 bg-white text-gray-800 dark:bg-[#1e293b] dark:text-slate-100 focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition appearance-none"
              >
                <option
                  value=""
                  disabled
                  className="bg-white text-gray-800 dark:bg-[#1e293b] dark:text-slate-100"
                >
                  Select Blood Group
                </option>
                {bloodGroups.map((group) => (
                  <option
                    key={group}
                    value={group}
                    className="bg-white text-gray-800 dark:bg-[#1e293b] dark:text-slate-100"
                  >
                    {group}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold mb-1.5 text-gray-700 dark:text-gray-300">
              District
            </label>
            <div className="relative">
              <FiMapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg z-10" />
              <select
                name="district"
                required
                value={formData.district}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-300 dark:border-gray-700 bg-white text-gray-800 dark:bg-[#1e293b] dark:text-slate-100 focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition appearance-none"
              >
                <option
                  value=""
                  disabled
                  className="bg-white text-gray-800 dark:bg-[#1e293b] dark:text-slate-100"
                >
                  Select District
                </option>
                {districts.map((district) => (
                  <option
                    key={district}
                    value={district}
                    className="bg-white text-gray-800 dark:bg-[#1e293b] dark:text-slate-100"
                  >
                    {district}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* উপজেলা */}
        <div>
          <label className="block text-sm font-semibold mb-1.5 text-gray-700 dark:text-gray-300">
            Upazila
          </label>
          <div className="relative">
            <FiMapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg z-10" />
            <select
              name="upazila"
              required
              disabled={!formData.district}
              value={formData.upazila}
              onChange={handleChange}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-300 dark:border-gray-700 bg-white text-gray-800 dark:bg-[#1e293b] dark:text-slate-100 focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition appearance-none disabled:opacity-50"
            >
              <option
                value=""
                disabled
                className="bg-white text-gray-800 dark:bg-[#1e293b] dark:text-slate-100"
              >
                Select Upazila
              </option>
              {formData.district &&
                upazilas[formData.district]?.map((upazila) => (
                  <option
                    key={upazila}
                    value={upazila}
                    className="bg-white text-gray-800 dark:bg-[#1e293b] dark:text-slate-100"
                  >
                    {upazila}
                  </option>
                ))}
            </select>
          </div>
        </div>

        {/* পাসওয়ার্ড ও কনফার্ম পাসওয়ার্ড */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold mb-1.5 text-gray-700 dark:text-gray-300">
              Password
            </label>
            <div className="relative">
              <FiLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                required
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#1e293b] text-gray-800 dark:text-slate-100 focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <FiEyeOff /> : <FiEye />}
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold mb-1.5 text-gray-700 dark:text-gray-300">
              Confirm Password
            </label>
            <div className="relative">
              <FiLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                required
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="••••••••"
                className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#1e293b] text-gray-800 dark:text-slate-100 focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showConfirmPassword ? <FiEyeOff /> : <FiEye />}
              </button>
            </div>
          </div>
        </div>

        <div className="pt-2">
          <button
            type="submit"
            disabled={uploading}
            className="w-full bg-[#b91c1c] hover:bg-[#991b1b] text-white py-3 rounded-xl font-semibold tracking-wide transition shadow-lg shadow-red-600/10 focus:outline-none disabled:opacity-50 dark:bg-[#b91c1c] dark:hover:bg-[#a11818]"
          >
            {uploading ? "Processing Image..." : "Register Now"}
          </button>
        </div>
        <p>
          Alrady I have an acount 
        <Link href={`/login`} className="px-3 underline text-red-600">Login</Link>
        </p>
      </form>
    </>
  );
};

export default RegisterForm;
