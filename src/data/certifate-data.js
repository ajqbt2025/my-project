import {
  VscAccount,
  VscDashboard,
  VscFilePdf,
  VscVerified,
  VscCreditCard,
  
} from "react-icons/vsc";

export const CertifiedLinks = [
  
  {
    id: 1,
    name: "Setting",
    path: "/dashboard/my-profile",
    icon: VscAccount,
  },
  {
    id: 2,
    name: "My Profile",
    path: "/certified/profile",
    icon: VscAccount,
  },
  {
    id: 3,
    name: "ID Card",
    path: "/certified/Id-card",
    icon: VscCreditCard, // 🪪 better match
  },
  {
    id: 4,
    name: "Shajra",
    path: "/notice/shajrah",
    icon: VscVerified, // ✔ genealogy / verification
  },
  {
    id: 5,
    name: "Character Certificate",
    path: "/certified/character/Certificate",
    icon: VscFilePdf, // 📄 certificate
  },
  {
    id: 6,
    name: "Marital Certificate",
    path: "/notice/marital",
    icon: VscDashboard, // 💍 (VSCode set me best available)
  }, 
  
];
