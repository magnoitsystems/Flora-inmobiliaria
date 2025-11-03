import Image from "next/image";
import styles from './SmallCard.module.css';
import Link from "next/link";

type Props = {
    id:number,
    imageSrc: string;
    price: number;
    transaction: string;
    adress: string;
    city: string;
    rooms: number;
    dorms: number;
    bathrooms: number;
    showLabel?: boolean;
};

export default function SmallCard({id, imageSrc, price, transaction, adress, city, rooms, dorms, bathrooms}:Props){
    const showLabel =
        transaction === "VENDIDA" ||
        transaction === "ALQUILADA" ||
        transaction === "Alquilada" ||
        transaction === "alquilada" ||
        transaction === "Vendida" ||
        transaction === "vendida"
    ;

    return (
        <main className={styles.card}>
            {showLabel && <div className={styles.addedLabel}>{transaction}</div>}
            <Link href={`/propiedades/ficha/${id}`}>
                <Image
                    src={imageSrc}
                    alt={`Imagen de la propiedad en ${adress}`}
                    fill
                    className={styles.cardImage}
                />
            </Link>
            <div className={styles.cardOverlay}>
                <h3 className={styles['cardPriceStatus']}>
                    USD {price} | {transaction}
                </h3>
                <h5 className={styles.cardAddress}>
                    {adress}, {city}
                </h5>
                <h6 className={styles.cardFeatures}>
                    {rooms} ambientes
                </h6>
                <h6 className={styles.cardFeatures}>
                    {dorms} dormitorios | {bathrooms} baños
                </h6>
            </div>
        </main>
    )
}

