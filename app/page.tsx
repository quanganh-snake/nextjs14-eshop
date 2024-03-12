import Image from 'next/image';
import { Hero } from './components/hero';
import { ProductSection } from './components/ProductSection';

export default function Home() {
    return (
        <main className="">
            <Hero />

            {/* Lastest Product Section */}
            <ProductSection title="Latest Product" />
            {/* Project Source Code Section */}
            <ProductSection title="Source Code" />
            {/* Icons Packs Section */}
            <ProductSection title="Icon Packs" />
        </main>
    );
}
