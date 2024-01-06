
import { Button } from "@/components/ui/button"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"

export function Credit() {

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="outline" className="hidden lg:block duration-1000 fixed bottom-6 right-[6rem] opacity-90">Developed By Robu Team</Button>
      </DrawerTrigger>
      <DrawerTrigger asChild>
        <Button variant="secondary" className="duration-1000 hidden">Developed By Robu Team</Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader>
            <DrawerTitle>Name</DrawerTitle>
            <DrawerDescription>Description</DrawerDescription>
          </DrawerHeader>

          <DrawerFooter>
            <Button>Hello!</Button>
          </DrawerFooter>
        </div>
        <DrawerClose asChild>
              <Button variant="ghost" className="w-auto fixed top-6 right-10 text-xl">x</Button>
        </DrawerClose>
        
      </DrawerContent>
      
    </Drawer>
    
  )
}
