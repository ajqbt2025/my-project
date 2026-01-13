import {
  VscHome,
  VscAccount,
  VscChecklist,
  VscOrganization,
  VscVerifiedFilled,
  VscSearch,
  VscServerProcess,
  VscCreditCard,
  VscCloudUpload,
  VscCommentDiscussion
} from "react-icons/vsc";

export const AdminLinks = [
  
  {
    id: 1,
    name: "All Clients",
    path: "/admin/clients",
    icon: VscAccount,
  },
  {
    id: 2,
    name: "Upload ID Card",
    path: "/certified/uploadIdCard",
    icon: VscCloudUpload, // ☁ upload
  },
  {
    id: 3,
    name: "Shajrah Requests",
    path: "/admin/shajrah",
    icon: VscOrganization,
  },
  {
    id: 4,
    name: "Marital Certificates",
    path: "/admin/marital",
    icon: VscVerifiedFilled,
  },
  {
    id: 5,
    name: "Payments",
    path: "/admin/payments",
    icon: VscCreditCard,
  },
 {
  id: 6,
  name: "Feedback Messages",
  path: "/admin/contact-messages",
  icon: VscCommentDiscussion,
},
  {
    id: 7,
    name: "System Logs",
    path: "/admin/logs",
    icon: VscServerProcess,
  },
  {
    id: 8,
    name: "Create Alert",
    path: "/admin/create-notification",
    icon: VscServerProcess,
  },
  
];
