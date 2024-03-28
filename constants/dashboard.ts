import { Dispatch, SetStateAction } from "react";
import {
    AlertTriangle,
    ArrowRight,
    Check,
    Users,
    CalendarPlus ,
    LogOut ,
    Flame,
    Activity,
    UserCog  ,
    CreditCard,
    File,
    FileText,
    HelpCircle,
    Image,
    Laptop,
    LayoutDashboardIcon,
    Loader2,
    LogIn,
    LucideIcon,
    LucideProps,
    Moon,
    MoreVertical,
    Pizza,
    Plus,
    Settings,
    SunMedium,
    Trash,
    Twitter,
    User,
    User2Icon,
    UserX2Icon,
    X,
    MailPlus, 
    MessageSquareText,
    UserPlus,
  } from "lucide-react";
  
export type Icon = LucideIcon;
  
export const Icons = {
    dashboard: LayoutDashboardIcon,
    mail: MailPlus,
    sms: MessageSquareText,
    settings: Settings,
    recruit:UserPlus,
    users: Users,
    activity: Activity,
    flame : Flame,
    login: LogIn,
    close: X,
    profile: User2Icon,
    spinner: Loader2,
   
    userCog : UserCog ,
    calendarplus : CalendarPlus ,
    trash: Trash,
    employee: UserX2Icon,
    post: FileText,
    page: File,
    media: Image,
    ellipsis: MoreVertical,
    add: Plus,
    warning: AlertTriangle,
    user: User,
    arrowRight: ArrowRight,
    help: HelpCircle,
    logout : LogOut ,
    sun: SunMedium,
    moon: Moon,
    laptop: Laptop,
    twitter: Twitter,
    check: Check,
  };

export interface NavItem {
    title: string;
    href?: string;
    disabled?: boolean;
    external?: boolean;
    label?: string;
    description?: string;
    permissions: string[];
    icon?: keyof typeof Icons;
  }
  
  export const navItems: NavItem[] = [
    {
      title: "Dashboard",
      href: "/dashboard",
      icon: "dashboard",
      label: "Dashboard",
      permissions : ['all'],
    },
    {
      title: "Spring24 Recruitment",
      href: "/dashboard/recruit",
      icon: "recruit",
      label: "recruit",
      permissions : ['Not a Member'],
    },
    {
      title: "Users",
      href: "/dashboard/users",
      icon: "users",
      label: "users",
      permissions : ['president', 'vp', 'ags', 'gso', 'gsa'],
    },
    {
      title: "Interview Panel",
      href: "/dashboard/interview",
      icon: "activity",
      label: "interview",
      permissions : ['president', 'vp', 'ags', 'gso', 'gsa', 'director','ad','secretary'],
    },
    {
      title: "Interview Status",
      href: "/dashboard/interview-status",
      icon: "flame",
      label: "interview-status",
      permissions : ['president', 'vp', 'ags', 'gso', 'gsa'],
    },
    {
      title: "Event Registration",
      href: "/dashboard/event-register",
      icon: "calendarplus",
      label: "event-register",
      permissions : [],
    },
    {
      title: "Event Manager",
      href: "/dashboard/event-manager",
      icon: "userCog",
      label: "event-manager",
      permissions : ['president', 'vp', 'ags', 'gso', 'gsa'],
    },
    {
      title: "Send Mail",
      href: "/dashboard/email",
      icon: "mail",
      label: "email",
      permissions : ['president', 'vp', 'ags', 'gso', 'gsa'],
    },
    {
      title: "Send Sms",
      href: "/dashboard/sms",
      icon: "sms",
      label: "sms",
      permissions : ['president', 'vp', 'ags', 'gso', 'gsa'],
    },
    {
      title: "Settings",
      href: "/dashboard/settings",
      icon: "settings",
      label: "settings",
      permissions : ['all'],
    },
  ];
  

export interface DashboardNavProps {
    items: NavItem[];
    setOpen?: Dispatch<SetStateAction<boolean>>;
  }