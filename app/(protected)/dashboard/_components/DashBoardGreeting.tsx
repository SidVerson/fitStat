import { getServerSession } from "next-auth";
import { authOptions } from "@/app/lib/authOptions"
import { getHours } from "date-fns";

function getTimeGreeting() {
    const currentHour = getHours(new Date());

    if (currentHour >= 5 && currentHour < 12) {
        return "Good morning";
    } else if (currentHour >= 12 && currentHour < 17) {
        return "Good afternoon";
    } else if (currentHour >= 17 && currentHour < 21) {
        return "Good evening";
    } else {
        return "Good night";
    }
}

export default async function GreetingComponent() {
    const session = await getServerSession(authOptions);
	const userName = session?.user?.name;
    const greeting = getTimeGreeting();

    return (
        <p className="mb-2">{greeting} {userName}</p>
    );
}
