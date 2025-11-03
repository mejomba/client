import Link from "next/link";
import {ClipboardList, Folder, Settings, Mail, Ticket, User} from "lucide-react";
import {cookies} from "next/headers";
import {redirect} from "next/navigation";
import { logout } from "@/lib/actions/auth";


export default function SignInMenu() {
    const acce_token = cookies().get('access')
    const handleLogout = async () => {
        // در صورت وجود API خروج، اینجا فراخوانی کن
        document.cookie = "access_token=; Max-Age=0; path=/;";
        redirect('/');
    };
    return (
        <div className="relative inline-block text-left group">
            {acce_token ? (
                <>
                    <button className="hover:text-blue-600 flex items-center gap-1">
                        Profile
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-4 h-4"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7"/>
                        </svg>
                    </button>

                    <div
                        className="absolute right-0 mt-0 w-48 bg-white shadow-lg border rounded-lg z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition">
                        <div className="w-60 rounded-xl shadow-lg border bg-white p-4">
                            {/* Sign in button */}
                            <form action={logout}>
                            <button type="submit"
                                  className="block text-center w-full bg-red-500 hover:bg-red-600 text-white font-medium py-2 rounded-full">
                                Logout
                            </button>
                            </form>
                            {/* Menu items */}
                            <ul className="mt-4 space-y-2 text-gray-700 text-sm">
                                <li>
                                    <Link
                                        href="/profile"
                                        className="flex items-center gap-2 px-2 py-2 rounded hover:bg-gray-100"
                                    >
                                        <ClipboardList className="w-4 h-4"/>
                                        Order history
                                    </Link>
                                </li>

                                <li>
                                    <Link
                                        href="/projects"
                                        className="flex items-center gap-2 px-2 py-2 rounded hover:bg-gray-100"
                                    >
                                        <Folder className="w-4 h-4"/>
                                        My Projects
                                    </Link>
                                </li>

                                <li>
                                    <Link
                                        href="/parts"
                                        className="flex items-center gap-2 px-2 py-2 rounded hover:bg-gray-100"
                                    >
                                        <Settings className="w-4 h-4"/>
                                        Parts Manager
                                    </Link>
                                </li>

                                <li>
                                    <Link
                                        href="/messages"
                                        className="flex items-center gap-2 px-2 py-2 rounded hover:bg-gray-100"
                                    >
                                        <Mail className="w-4 h-4"/>
                                        My Messages
                                    </Link>
                                </li>

                                <li>
                                    <Link
                                        href="/coupons"
                                        className="flex items-center gap-2 px-2 py-2 rounded hover:bg-gray-100"
                                    >
                                        <Ticket className="w-4 h-4"/>
                                        My Coupons
                                    </Link>
                                </li>

                                <li>
                                    <Link
                                        href="/account"
                                        className="flex items-center gap-2 px-2 py-2 rounded hover:bg-gray-100"
                                    >
                                        <User className="w-4 h-4"/>
                                        My Account
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </>
            ) : (
                <>
                    {/* دکمه */}
                    <button className="hover:text-blue-600 flex items-center gap-1">
                        Sign in
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-4 h-4"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7"/>
                        </svg>
                    </button>
                    <div
                        className="absolute right-0 mt-0 w-48 rounded-lg z-50 opacity-0 invisible
             group-hover:opacity-100 group-hover:visible transition
             backdrop-blur-md bg-white/30 border border-white/20 shadow-lg"
                    >
                        <div
                            className="w-60 rounded-xl shadow-lg border border-white/20 bg-white p-4 backdrop-blur-lg">
                            {/* Sign in button */}
                            <Link
                                href="/auth/login/"
                                className="block text-center w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 rounded-full"
                            >
                                Sign in
                            </Link>

                            {/* Start Here */}
                            <p className="text-sm text-gray-700 mt-2">
                                New Customer?{" "}
                                <Link href="/auth/login" className="text-blue-500 hover:underline">
                                    Start Here
                                </Link>
                            </p>

                            {/* Menu items with overlay */}
                            <div className="relative mt-4">
                                {/* Overlay layer */}
                                <div className="absolute inset-0 bg-white/40 backdrop-blur-[1px] rounded-lg z-10"></div>

                                {/* Menu items */}
                                <ul className="relative space-y-2 text-gray-800 text-sm">
                                    <li>
                                        <div
                                            className="flex items-center gap-2 px-2 py-2 rounded text-gray-500 cursor-not-allowed"
                                        >
                                            <ClipboardList className="w-4 h-4"/>
                                            Order history
                                        </div>
                                    </li>
                                    <li>
                                        <div
                                            className="flex items-center gap-2 px-2 py-2 rounded text-gray-500 cursor-not-allowed"
                                        >
                                            <Folder className="w-4 h-4"/>
                                            My Projects
                                        </div>
                                    </li>
                                    <li>
                                        <div
                                            className="flex items-center gap-2 px-2 py-2 rounded text-gray-500 cursor-not-allowed"
                                        >
                                            <Settings className="w-4 h-4"/>
                                            Parts Manager
                                        </div>
                                    </li>
                                    <li>
                                        <div
                                            className="flex items-center gap-2 px-2 py-2 rounded text-gray-500 cursor-not-allowed"
                                        >
                                            <Mail className="w-4 h-4"/>
                                            My Messages
                                        </div>
                                    </li>
                                    <li>
                                        <div
                                            className="flex items-center gap-2 px-2 py-2 rounded text-gray-500 cursor-not-allowed"
                                        >
                                            <Ticket className="w-4 h-4"/>
                                            My Coupons
                                        </div>
                                    </li>
                                    <li>
                                        <div
                                            className="flex items-center gap-2 px-2 py-2 rounded text-gray-500 cursor-not-allowed"
                                        >
                                            <User className="w-4 h-4"/>
                                            My Account
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>


                </>
            )}
        </div>
    );
}
