'use client';

import { useState } from 'react';
import Cart from './components/Cart';
import { Hero } from './components/hero';
import { ProductSection } from './components/ProductSection';

export default function Home() {
    return (
            <main className="">
                {/* Hero */}
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
