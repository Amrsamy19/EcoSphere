'use client'
import { MdOutlineAddToPhotos, MdOutlineEventRepeat } from "react-icons/md";
import { RxDashboard } from "react-icons/rx";
import { PiListMagnifyingGlassBold } from "react-icons/pi";
import { Gamepad2, Calendar, Home, ShoppingBag, Recycle, Store, ShoppingCart, Heart, LogIn, Newspaper, Info } from "lucide-react"
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarTrigger,
    SidebarMenuBadge
} from "@/components/ui/sidebar";
import Link from 'next/link';
import { usePathname } from "next/navigation";
import ThemeBtn from '../ThemeBtn/ThemeBtn';
import UserBtn from '../UserBtn/UserBtn';
import { RootState } from "@/frontend/redux/store";
import { useSelector } from "react-redux";
// User items.
const useritems = [
    {
        title: "Home",
        url: "/",
        icon: Home,
    },
    {
        title: "Shops",
        url: "/shop",
        icon: ShoppingBag,
    },
    {
        title: "Events",
        url: "/events",
        icon: Calendar,
    },
    {
        title: "Recycle",
        url: "/recycle",
        icon: Recycle,
    },
    {
        title: "News",
        url: "/news",
        icon: Newspaper,
    },
    {
        title: "Store",
        url: "/store",
        icon: Store,
    },
    {
        title: "Game",
        url: "/game",
        icon: Gamepad2,
    },
    {
        title: "About",
        url: "/about",
        icon: Info,
    },
]
// Event dashboard items.
const dashboardItems = [
    {
        title: "OverView",
        url: "/dashboard/overview",
        icon: RxDashboard,
    },
    {
        title: "Add Event",
        url: "/dashboard/add",
        icon: MdOutlineAddToPhotos,
    },
    {
        title: "View events",
        url: "/dashboard/viewDetails",
        icon: MdOutlineEventRepeat,
    },
    {
        title: "Browse Events",
        url: "/dashboard/browse",
        icon: PiListMagnifyingGlassBold,
    },
]

export default function SideBar() {
    const pathname = usePathname();
    const { favProducts } = useSelector((state: RootState) => state.fav);
    return (
        <Sidebar collapsible="icon" variant='floating' className='bg-background '>
            <SidebarHeader >
                <SidebarTrigger />
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>Application</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {useritems.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton asChild isActive={pathname === item.url}>
                                        <Link href={item.url}  >
                                            <item.icon />
                                            <span className='capitalize'>{item.title}</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>

                    </SidebarGroupContent>
                </SidebarGroup>
                <SidebarGroup>
                    <SidebarGroupLabel>Dashboard</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {dashboardItems.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton asChild isActive={pathname === item.url}>
                                        <Link href={item.url}>
                                            <item.icon />
                                            <span className='capitalize'>{item.title}</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>

                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter>
                <SidebarGroupContent className='gap-2'>
                    <SidebarMenu>
                        <SidebarMenuItem >
                            <SidebarMenuButton asChild isActive={pathname === '/fav'}>
                                <Link href="/fav">
                                    <Heart />
                                    <span>Favorite</span>
                                </Link>
                            </SidebarMenuButton>
                            <SidebarMenuBadge >{favProducts.length}</SidebarMenuBadge>
                        </SidebarMenuItem>
                        <SidebarMenuItem >
                            <SidebarMenuButton asChild isActive={pathname === '/cart'}>
                                <Link href="/cart">
                                    <ShoppingCart />
                                    <span>Cart</span>
                                </Link>
                            </SidebarMenuButton>
                            <SidebarMenuBadge>24</SidebarMenuBadge>
                        </SidebarMenuItem>
                        <SidebarMenuItem >
                            <SidebarMenuButton asChild isActive={pathname === '/auth'}>
                                <Link href="/auth">
                                    <LogIn />
                                    <span>Login</span>
                                </Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                        <ThemeBtn />
                        <UserBtn />
                    </SidebarMenu>
                </SidebarGroupContent>
            </SidebarFooter>
        </Sidebar>
    )
}
