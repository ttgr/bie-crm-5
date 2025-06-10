
import { useState } from "react"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Check, ChevronsUpDown, X } from "lucide-react"
import { Delegate } from "@/types/delegate"

interface DelegateSelectorProps {
  delegates: Delegate[]
  selectedDelegates: Delegate[]
  onDelegateSelect: (delegates: Delegate[]) => void
}

export function DelegateSelector({ delegates, selectedDelegates, onDelegateSelect }: DelegateSelectorProps) {
  const [open, setOpen] = useState(false)
  const [searchValue, setSearchValue] = useState("")

  const filteredDelegates = delegates.filter(delegate =>
    delegate.contactName.toLowerCase().includes(searchValue.toLowerCase()) &&
    !selectedDelegates.find(selected => selected.id === delegate.id)
  )

  const handleSelectDelegate = (delegate: Delegate) => {
    onDelegateSelect([...selectedDelegates, delegate])
    setSearchValue("")
  }

  const handleRemoveDelegate = (delegateId: string) => {
    onDelegateSelect(selectedDelegates.filter(d => d.id !== delegateId))
  }

  return (
    <div className="space-y-2">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between"
          >
            {selectedDelegates.length === 0 ? "Select delegates..." : `${selectedDelegates.length} delegate(s) selected`}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full p-0">
          <Command>
            <CommandInput 
              placeholder="Search delegates..." 
              value={searchValue}
              onValueChange={setSearchValue}
            />
            <CommandList>
              <CommandEmpty>No delegates found.</CommandEmpty>
              <CommandGroup>
                {filteredDelegates.map((delegate) => (
                  <CommandItem
                    key={delegate.id}
                    onSelect={() => {
                      handleSelectDelegate(delegate)
                      setOpen(false)
                    }}
                  >
                    <Check className="mr-2 h-4 w-4 opacity-0" />
                    <div className="flex-1">
                      <div className="font-medium">{delegate.contactName}</div>
                      <div className="text-xs text-gray-500">
                        {delegate.memberState || delegate.role || delegate.contactType}
                      </div>
                    </div>
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>

      {selectedDelegates.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {selectedDelegates.map((delegate) => (
            <Badge key={delegate.id} variant="secondary" className="pr-1">
              {delegate.contactName}
              <Button
                variant="ghost"
                size="sm"
                className="h-auto p-1 ml-1"
                onClick={() => handleRemoveDelegate(delegate.id)}
              >
                <X className="h-3 w-3" />
              </Button>
            </Badge>
          ))}
        </div>
      )}
    </div>
  )
}
