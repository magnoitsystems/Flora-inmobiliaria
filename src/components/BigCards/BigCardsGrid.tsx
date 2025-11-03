'use client'

import styles from './BigCard.module.css'
import {cactus} from "@/app/(views)/ui/fonts";
import BigCard from "@/components/BigCards/BigCard";
import React, { useEffect, useState } from "react";
import { Property } from "@/types/Property";
import { CharacteristicCategory } from "@/types/Characteristic";
import { useSearchParams } from 'next/navigation';

export default function BigCardsGrid() {
    const [properties, setProperties] = useState<Property[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const searchParams = useSearchParams();

    useEffect(() => {
        const fetchProperties = async () => {
            try {
                setLoading(true);
                
                // Usar los query params actuales de la URL
                const currentParams = new URLSearchParams(searchParams.toString());
                
                const response = await fetch(`/api/properties?${currentParams.toString()}`);
                
                if (!response.ok) {
                    throw new Error('Error al cargar propiedades');
                }

                const data: Property[] = await response.json();
                setProperties(data);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Error desconocido');
            } finally {
                setLoading(false);
            }
        };

        fetchProperties();
    }, [searchParams]);

    // Función helper para extraer valor de característica
    const getCharacteristicValue = (property: Property, category: CharacteristicCategory): number => {
        const characteristic = property.characteristics.find(c => c.category === category);
        return characteristic?.value_integer || 0;
    };

    if (loading) {
        return (
            <main className={`${styles.grid} ${cactus.className}`}>
                <div className={styles.loading}>Cargando propiedades...</div>
            </main>
        );
    }

    if (error) {
        return (
            <main className={`${styles.grid} ${cactus.className}`}>
                <div className={styles.error}>Error: {error}</div>
            </main>
        );
    }

    if (properties.length === 0) {
        return (
            <main className={`${styles.grid} ${cactus.className}`}>
                <div className={styles.noResults}>No se encontraron propiedades</div>
            </main>
        );
    }

    return (
        <main className={`${styles.grid} ${cactus.className}`}>
            {properties.map((property) => (
                <BigCard
                    key={property.id}
                    id={property.id}
                    imageSrc={property.images[0]?.url?.trim() || "/backgrounds/notImage.jpg"}
                    price={property.price}
                    transaction={property.state}
                    adress={property.address}
                    city={property.city || "Tandil"}
                    rooms={getCharacteristicValue(property, CharacteristicCategory.AMBIENTES)}
                    dorms={getCharacteristicValue(property, CharacteristicCategory.DORMITORIOS)}
                    bathrooms={getCharacteristicValue(property, CharacteristicCategory.BANOS)}
                />
            ))}
        </main>
    );
}