declare module 'astro:content' {
	export { z } from 'astro/zod';
	export type CollectionEntry<C extends keyof typeof entryMap> =
		(typeof entryMap)[C][keyof (typeof entryMap)[C]] & Render;

	type BaseSchemaWithoutEffects =
		| import('astro/zod').AnyZodObject
		| import('astro/zod').ZodUnion<import('astro/zod').AnyZodObject[]>
		| import('astro/zod').ZodDiscriminatedUnion<string, import('astro/zod').AnyZodObject[]>
		| import('astro/zod').ZodIntersection<
				import('astro/zod').AnyZodObject,
				import('astro/zod').AnyZodObject
		  >;

	type BaseSchema =
		| BaseSchemaWithoutEffects
		| import('astro/zod').ZodEffects<BaseSchemaWithoutEffects>;

	type BaseCollectionConfig<S extends BaseSchema> = {
		schema?: S;
		slug?: (entry: {
			id: CollectionEntry<keyof typeof entryMap>['id'];
			defaultSlug: string;
			collection: string;
			body: string;
			data: import('astro/zod').infer<S>;
		}) => string | Promise<string>;
	};
	export function defineCollection<S extends BaseSchema>(
		input: BaseCollectionConfig<S>
	): BaseCollectionConfig<S>;

	type EntryMapKeys = keyof typeof entryMap;
	type AllValuesOf<T> = T extends any ? T[keyof T] : never;
	type ValidEntrySlug<C extends EntryMapKeys> = AllValuesOf<(typeof entryMap)[C]>['slug'];

	export function getEntryBySlug<
		C extends keyof typeof entryMap,
		E extends ValidEntrySlug<C> | (string & {})
	>(
		collection: C,
		// Note that this has to accept a regular string too, for SSR
		entrySlug: E
	): E extends ValidEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;
	export function getCollection<C extends keyof typeof entryMap, E extends CollectionEntry<C>>(
		collection: C,
		filter?: (entry: CollectionEntry<C>) => entry is E
	): Promise<E[]>;

	type InferEntrySchema<C extends keyof typeof entryMap> = import('astro/zod').infer<
		Required<ContentConfig['collections'][C]>['schema']
	>;

	type Render = {
		render(): Promise<{
			Content: import('astro').MarkdownInstance<{}>['Content'];
			headings: import('astro').MarkdownHeading[];
			remarkPluginFrontmatter: Record<string, any>;
		}>;
	};

	const entryMap: {
		"free-patterns": {
"basic-dog-sweater.md": {
  id: "basic-dog-sweater.md",
  slug: "basic-dog-sweater",
  body: string,
  collection: "free-patterns",
  data: any
},
"cardigan-diagonal-pockets.md": {
  id: "cardigan-diagonal-pockets.md",
  slug: "cardigan-diagonal-pockets",
  body: string,
  collection: "free-patterns",
  data: any
},
"cotton-lace-summer-coverup.md": {
  id: "cotton-lace-summer-coverup.md",
  slug: "cotton-lace-summer-coverup",
  body: string,
  collection: "free-patterns",
  data: any
},
"raglan-sweater-hoodie.md": {
  id: "raglan-sweater-hoodie.md",
  slug: "raglan-sweater-hoodie",
  body: string,
  collection: "free-patterns",
  data: any
},
"round-neck-vest.md": {
  id: "round-neck-vest.md",
  slug: "round-neck-vest",
  body: string,
  collection: "free-patterns",
  data: any
},
"v-neck-raglan-sweater.md": {
  id: "v-neck-raglan-sweater.md",
  slug: "v-neck-raglan-sweater",
  body: string,
  collection: "free-patterns",
  data: any
},
"v-neck-vest.md": {
  id: "v-neck-vest.md",
  slug: "v-neck-vest",
  body: string,
  collection: "free-patterns",
  data: any
},
},
"knitting-library": {
"knitting-gauge-formula.md": {
  id: "knitting-gauge-formula.md",
  slug: "knitting-gauge-formula",
  body: string,
  collection: "knitting-library",
  data: any
},
},

	};

	type ContentConfig = never;
}
