import TechnicalSheet from '@/components/TechnicalFile/TechnicalSheet';
import {PropertySchema} from "@/components/SEO/PropertySchema";
import { getBaseUrl } from "@/lib/baseURL";
import {notFound} from "next/navigation";
import {Metadata} from "next";

type PageProps = {
	params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
	const { id } = await params;
	const response = await fetch(getBaseUrl() + `/api/properties/${id}`);

	if (!response.ok) return { title: 'Propiedad no encontrada' };

	const property = await response.json();

	return {
		title: `${property.type} en ${property.state} - ${property.address}`,
		description: property.description.substring(0, 160),
		openGraph: {
			title: `${property.type} - $${property.price.toLocaleString('es-AR')}`,
			description: property.description,
			images: property.images?.[0]?.url ? [property.images[0].url] : [],
			url: `${getBaseUrl()}/propiedades/ficha/${id}`,
		},
		alternates: {
			canonical: `${getBaseUrl()}/propiedades/ficha/${id}`,
		},
	};
}

export default async function FichaPropiedadPage({ params }: PageProps) {
	const { id } = await params;
	console.log(getBaseUrl());
	const response = await fetch(getBaseUrl() + `/api/properties/${id}`);
	if (!response.ok) {
		console.error(`Error obteniendo propiedad con id: ${id}:`, response.statusText);

		if (response.status === 404) {
			return notFound();
		}
		throw new Error(`Failed to fetch property: ${response.statusText}`);
	}
	const property = await response.json();

	return (
		<main>
			<PropertySchema property={property} />
			<TechnicalSheet mode="view" property={property} />
		</main>
	);
}