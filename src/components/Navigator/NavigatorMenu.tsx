import {
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    Avatar,
    useDisclosure,
    Button,
    Divider,
} from '@chakra-ui/react'
import { Bars3Icon, ChevronRightIcon } from '@heroicons/react/24/solid'
import { XCircleIcon } from '@heroicons/react/24/outline'
import { Link } from 'react-router';
// import useScreenSize from "../../features/useScreenSize";

const NavigatorMenu = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()

    return (
        <>
            <Button bgColor={'white'} size={'sm'} onClick={onOpen}>
                <Bars3Icon className='h-6 w-6' />
            </Button>
            <Drawer
                isOpen={isOpen}
                placement='right'
                onClose={onClose}
                size={'xs'}
            >
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerHeader className='h-full w-full flex justify-between items-center gap-2'>
                        <div className='h-full w-full flex items-center gap-2'>
                            <Avatar size={'sm'} />
                            <p className=''><span>Hi</span>, Account</p>
                        </div>
                        <i onClick={onClose}>
                            <XCircleIcon className='h-7 w-7' />
                        </i>
                    </DrawerHeader>
                    <Divider />
                    <DrawerBody className='flex flex-col h-full w-full gap-4 mt-[3%]'>
                        <NavigatorMenuLink
                            title={'Explore Movies'}
                            type={'movie'}
                            onClose={onClose}
                        />
                        <NavigatorMenuLink
                            title={'Explore TV Shows'}
                            type={'tv'}
                            onClose={onClose}
                        />
                    </DrawerBody>
                    <DrawerFooter>
                        <Button variant='outline' mr={3} onClick={onClose}>
                            Log out
                        </Button>
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>
        </>
    );
}

export default NavigatorMenu

type NavigatorMenuLinkProps = {
    onClose: () => void;
    title: string;
    type: string;
}

const NavigatorMenuLink = ({ title, onClose, type }: NavigatorMenuLinkProps) => {
    return (
        <section>
            <Link
                to={'/movie/movieList'}
                state={{ media: type }}
                onClick={onClose}
                className='h-full w-full flex justify-between items-center'
            >
                <p className='text-lg font-bold'>{title}</p>
                <ChevronRightIcon className='h-5 w-5' />
            </Link>
        </section>
    );
}