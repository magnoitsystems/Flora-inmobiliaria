import { MetadataRoute } from 'next'
import { getBaseUrl } from '@/lib/baseURL'

async function getAllPropertyIds(): Promise<string[]> {
	try {
		const response = await fetch(`${getBaseUrl()}/api/properties`, {
			cache: 'no-store' // Siempre fresh data para sitemap
		})

		if (!response.ok) return []

		const properties = await response.json()
		return properties.map((p: any) => p.id)
	} catch (error) {
		console.error('Error fetching properties for sitemap:', error)
		return []
	}
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
	const baseUrl = getBaseUrl()

	// Páginas estáticas
	const staticRoutes = [
		'',
		'/nosotros',
		'/propiedades',
		'/quiero-vender'
	].map((route) => ({
		url: `${baseUrl}${route}`,
		lastModified: new Date().toISOString(),
		changeFrequency: 'weekly' as const,
		priority: route === '' ? 1 : 0.8,
	}))

	// Páginas dinámicas de propiedades
	const propertyIds = await getAllPropertyIds()
	const propertyRoutes = propertyIds.map((id) => ({
		url: `${baseUrl}/propiedades/ficha/${id}`,
		lastModified: new Date().toISOString(),
		changeFrequency: 'daily' as const,
		priority: 0.9,
	}))

	return [...staticRoutes, ...propertyRoutes]
}