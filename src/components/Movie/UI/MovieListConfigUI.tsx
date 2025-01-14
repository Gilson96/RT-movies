import { Accordion, AccordionItem, AccordionButton, AccordionPanel, AccordionIcon, Box, Divider, Menu, MenuButton, MenuList } from '@chakra-ui/react'
import { ChevronDownIcon } from '@heroicons/react/24/solid';
import { ReactNode } from 'react';

type AccordionBoxProps = {
    title: string;
    children: ReactNode;
}

export const AccordionBox = ({ title, children }: AccordionBoxProps) => {

    return (
        <section className='h-full w-full small-screen:w-full small-screen:bg-white  small-screen:rounded-xl'>
            <Accordion allowToggle>
                <AccordionItem border={'1px solid #cbd5e1'} rounded={'xl'} shadow={'base'}>
                    <h2>
                        <AccordionButton>
                            <Box as='span' flex='1' textAlign='left' fontWeight={'semibold'}>
                                {title}
                            </Box>
                            <AccordionIcon />
                        </AccordionButton>
                        <Divider />
                    </h2>
                    <AccordionPanel pb={4}>
                        {children}
                    </AccordionPanel>
                </AccordionItem>
            </Accordion>
        </section>

    );
}

type DropdownProps = {
    title: string;
    children: ReactNode;
}

export const DropdownMenu = ({ title, children }: DropdownProps) => {

    const formatTitle = () => {
        const oldTitle = title.replace('_', ' ')
        const newTitle = oldTitle    
 
        return newTitle.replace('.',' ')
    }

    console.log(formatTitle())

    return (
        <Menu>
            <MenuButton as={'button'} className='h-full w-full bg-neutral-100  p-[4%] rounded-xl border shadow'>
                <p className='flex justify-between items-center gap-2 text-sm tablet:text-lg text-neutral-700 capitalize small-screen:text-sm'>{formatTitle()}<ChevronDownIcon className='h-3 w-3 tablet:h-5 tablet:w-5' /></p>
            </MenuButton>
            <MenuList>
                {children}
            </MenuList>
        </Menu>
    );
}
