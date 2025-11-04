'use client';
import SmallCard from "@/components/SmallCards/SmallCard";
import styles from './SmallCardsGrid.module.css';
import React from "react";
import { usePathname } from 'next/navigation';

type Property = {
    id: number;
    imageUrl: string;
    price: number;
    address: string;
    city: string;
    rentOrSale: string;
    state: string;
    features:{
        rooms: number;
        bedrooms: number;
        bathrooms: number;
    };
};

type PropertyGridProps = {
    properties: Property[];
};

const PropertyGrid = ({ properties }: PropertyGridProps) => {
    const pathname = usePathname();
    return (
        <div className={styles.cardsProperties}>

            <div className={styles['propertyGrid']}>
                {properties.map((property) => (
                    <SmallCard
	                    key={property.id}
                        property={property}
                    />
                ))}
            </div>

        </div>
    );
};

export default PropertyGrid;