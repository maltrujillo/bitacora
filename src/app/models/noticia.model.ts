/** Categorías disponibles y su color corporativo. */
export const COLORES: Record<string, string> = {
  Educativas: '#3E63B0', Tecnológicas: '#6B4A9B', Turísticas: '#1C8F6A', Comerciales: '#C0672B',
};
export const CATEGORIAS = Object.keys(COLORES);

/** Estructura de cada noticia en public/data/noticias.json */
export interface Noticia {
  id: number;
  categoria: string;
  titulo: string;
  descripcion: string;
  contenido: string[];
  fecha: string;
  autor: string;
  datos: Record<string, string> | null;
  imagen?: string;
}
