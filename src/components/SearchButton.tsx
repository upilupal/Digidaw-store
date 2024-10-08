'use client'
import { useDebouncedValue } from '@mantine/hooks'
import { Search } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useCallback, useEffect, useState, useTransition } from 'react'
import { cn } from '@/lib/utils'
import { Button } from './ui/button'
import { Skeleton } from './ui/skeleton'
import searchProducts from '@/app/actions/searchProducts'
import { CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from './ui/command'
import { SearchProducts } from '../../types/search-products'

const SearchButton = () => {
  const [open, setOpen] = useState<boolean>(false)
  const [query, setQuery] = useState<string>('')
  const [debounced] = useDebouncedValue(query, 300)
  const [data, setData] = useState<SearchProducts[] | null>(null)
  const [isPending, startTransition] = useTransition()
  const router = useRouter()

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((open) => !open)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  useEffect(() => {
    if (debounced.length <= 0) {
      setData(null)
      return
    }

    const fetchProducts = async () => {
      const response = await searchProducts(debounced)
      setData(response)
    }

    startTransition(fetchProducts)

    return () => setData(null)
  }, [debounced])

  useEffect(() => {
    if (!open) {
      setQuery('')
    }
  }, [open])

  const handleSelect = useCallback((callback: () => unknown) => {
    setOpen(false)
    callback()
  }, [])

  return (
    <>
      <Button
        onClick={() => setOpen((open) => !open)}
        variant='outline'
        className='relative p-0 h-10 w-80 md:justify-start md:px-3 md:py-2'
      >
        <Search className='h-4 w-4 mr-2' aria-hidden='true' />
        <span className='inline-flex'>Search products...</span>
        <span className='sr-only'>Search products</span>
        <kbd className='pointer-events-none absolute right-2 top-2 hidden h-6 select-none items-center gap-1 rounded-full border bg-muted px-1.5 font-mono text-xs font-medium opacity-100 md:flex'>
          <abbr title='Control' className='no-underline'>
            Ctrl
          </abbr>
          K
        </kbd>
      </Button>
      <CommandDialog position='top' open={open} onOpenChange={setOpen}>
        <CommandInput
          value={query}
          onValueChange={setQuery}
          placeholder='Search products...'
        />
        <CommandList>
          <CommandEmpty
            className={cn(isPending ? 'hidden' : 'py-6 text-center text-sm')}
          >
            No products found.
          </CommandEmpty>
          {isPending ? (
            <div className='space-y-1 overflow-hidden px-1 py-2'>
              <Skeleton className='h-4 w-10 rounded' />
              <Skeleton className='h-8 rounded-sm' />
              <Skeleton className='h-8 rounded-sm' />
            </div>
          ) : (
            <CommandGroup>
              {data?.map((item) => (
                <CommandItem
                  key={item.id}
                  value={item.name}
                  onSelect={() =>
                    handleSelect(() =>
                      router.push(`/product/${item.id}?productId=${item.id}`)
                    )
                  }
                >
                  <span className='truncate'>{item.name}</span>
                </CommandItem>
              ))}
            </CommandGroup>
          )}
        </CommandList>
      </CommandDialog>
    </>
  )
}

export default SearchButton