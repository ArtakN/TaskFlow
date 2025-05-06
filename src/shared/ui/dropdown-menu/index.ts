// @shared/ui/dropdown-menu/index.ts

// Реэкспортируем нужные компоненты из файла Shadcn UI
export {
	DropdownMenu, // Компонент-триггер (то, на что кликаем для открытия)
	DropdownMenuContent, // Контейнер с содержимым меню
	DropdownMenuItem, // Кликабельный пункт меню
	DropdownMenuSeparator, // Визуальный разделитель (если понадобится)
	// Добавьте сюда другие части, если они будут нужны, например DropdownMenuLabel
	// Корневой компонент меню
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
// (алиас @/components должен указывать на src/components)
