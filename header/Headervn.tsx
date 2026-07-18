import Link from 'next/link';
import MenuClients from '@/components/MenuClients';
import MobileDrawer from '@/components/page/header/MobileDrawer';
import type { MenuItem } from '@/models/Menu';

interface Header1Props {
    settings?: Record<string, any>;
    mainItems?:      MenuItem[];
    mobileItems?:    MenuItem[];
    builderContent?: Record<string, any[]>;
}

export default function Headervn({
    settings = {},
    mainItems      = [],
    mobileItems    = [],
    builderContent = {},
}: Header1Props) {
    const isSticky      = settings.header_sticky      !== 'false';
    const isTransparent = settings.header_transparent === 'true';

    return (
        <header className={`z-50 border-b border-gray-200 shadow-sm ${isSticky ? 'sticky top-0' : 'relative'} ${isTransparent ? 'bg-transparent' : 'bg-white'}`}>
            <div className="container h-16 flex items-center justify-between w-full gap-6">
                <Link href="/" className="text-xl font-extrabold text-gray-900 tracking-tight shrink-0 flex items-center">
                    {settings.logo ? (
                        <img src={settings.logo} alt={settings.siteName || 'MySite'} className="h-8 w-auto object-contain" />
                    ) : (
                        settings.siteName || 'MySite'
                    )}
                </Link>
                
                {mainItems.length > 0 && (
                    <div className="hidden md:flex justify-end flex-1">
                        <MenuClients menuItems={mainItems} settings={settings} builderContent={builderContent} className="flex items-center" />
                    </div>
                )}
                <MobileDrawer items={mobileItems} siteName={settings.siteName} iconColor="#374151" />
            </div>
        </header>
    );
}
