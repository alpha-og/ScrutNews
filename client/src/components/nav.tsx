import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuIndicator,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    NavigationMenuViewport,
} from "@/components/ui/navigation-menu";
import React from "react";

const Navbar = () => {
    return (
        <div className="navbar bg-gray-800 p-4">
        <nav className="flex items-center justify-between flex-wrap">
            <div className="flex items-center flex-shrink-0 text-white mr-6">
                <span className="font-semibold text-xl tracking-tight ">SN</span>
            </div>
            <div className="block lg:hidden">
                <button
                    className="flex items-center px-3 py-2 border rounded text-white border-white hover:text-white hover:border-white"
                >
                    <svg
                        className="fill-current h-3 w-3"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                    >
                        <title>Menu</title>
                        <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
                    </svg>
                </button>
            </div>
            <div className="w-full flex-grow lg:flex lg:items-center lg:w-auto">
                <div className="text-sm lg:flex-grow">
                    <a
                        href="/"
                        className="block mt-4 lg:inline-block lg:mt-0 text-white hover:text-white mr-4"
                    >
                        Home
                    </a>
                    <a
                        href="/news"
                        className="block mt-4 lg:inline-block lg:mt-0 text-white hover:text-white mr-4"
                    >
                        News
                    </a>
                </div>
            </div>
        </nav>
    </div>
);
    };


export default Navbar;
