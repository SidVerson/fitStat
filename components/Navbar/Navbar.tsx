import Link from "next/link";

export default function Navbar() {
    return (
        <div className="px-5 py-3 bg-white dark:bg-custom-gray block md:hidden shadow-md">
            <ul className="flex space-x-2">
                <li><Link href="/dashboard">Dashboard</Link></li>
                <li><Link href="/workout">Workout</Link></li>
                <li><Link href="/routines">Routines</Link></li>
                <li><Link href="/exercises">Exercises</Link></li>
            </ul>
        </div>
    )
}