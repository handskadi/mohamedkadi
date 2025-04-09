'use client';
import { usePathname, useRouter } from 'next/navigation';

export default function LanguageSwitcher() {
    const router = useRouter();
    const pathname = usePathname();

    const changeLanguage = (lang: string) => {
        const segments = pathname.split('/');
        segments[1] = lang;
        router.push(segments.join('/'));
    };

    return (
        <select onChange={(e) => changeLanguage(e.target.value)} className="ml-2">
            <option value="en">🇺🇸 EN</option>
            <option value="fr">🇫🇷 FR</option>
            <option value="de">🇩🇪 DE</option>
            <option value="ar">🇸🇦 AR</option>
        </select>
    );
}
