import { useState } from 'react'
import { useSearchMoviesQuery } from '../../features/Movies/movieDetailsEndpoints'
import { XCircleIcon } from '@heroicons/react/24/outline'
import { useDisclosure, Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, Spinner, Tooltip } from '@chakra-ui/react'
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid'
import useScreenSize from "../../features/useScreenSize";
import { Link } from 'react-router'

type NavigationSearchProps = {
    id: string,
    title: string;
    release_date: string;
    poster_path: string;
}

const NavigatorSearch = () => {
    const [inputValue, setInputValue] = useState<string>('hello')
    const { data: search, isLoading } = useSearchMoviesQuery({ title: inputValue!, type: 'movie' })
    const { isOpen, onOpen, onClose } = useDisclosure()
    const screenSize = useScreenSize()

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value)
    }

    if (!search) return <div>Missing post!</div>

    return (
        <>
            <i
                onClick={onOpen}
                className='h-auto w-full border p-[2%] rounded-xl shadow tablet:w-[70%] small-screen:border-none small-screen:shadow-none small-screen:w-0'
            >
                <MagnifyingGlassIcon className='h-5 w-5 cursor-pointer small-screen:h-7 small-screen:w-7' />
            </i>
            <Modal
                isOpen={isOpen}
                onClose={onClose}
                size={screenSize.width > 1000 ? 'xl' : 'md'}
            >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader className='flex items-center justify-between'>
                        <input
                            type='text'
                            className='h-auto w-[70%] border py-[2%] px-[5%] rounded-xl shadow tablet:py-[1%] small-phone:w-[90%]'
                            placeholder='search...'
                            onChange={handleChange}
                            value={inputValue}
                        />
                        <i onClick={onClose}>
                            <Tooltip label='Close'>
                                <XCircleIcon className='h-7 w-7 cursor-pointer small-screen:h-8 small-screen:w-8' />
                            </Tooltip>
                        </i>

                    </ModalHeader>

                    <ModalBody>
                        {isLoading ?
                            <div className="h-full w-full flex justify-center items-center">
                                <Spinner />
                            </div>
                            :
                            <div className='h-full w-full flex flex-wrap justify-around'>
                                {search.results.filter((movie: NavigationSearchProps) => movie.poster_path !== null).map((movie: NavigationSearchProps, index: number) => (
                                    <Link
                                        key={index}
                                        to={`/movie/${movie.id}`}
                                        onClick={onClose}
                                    >
                                        <div className={`h-full w-full flex flex-col`}>
                                            <img
                                                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                                                alt="poster"
                                                className="h-[12rem] w-[8rem] rounded border shadow-lg small-screen:h-[15rem] small-screen:w-[10rem]"
                                            />
                                            <div className="flex gap-1 p-[2%] w-[70%]">
                                                <p className="font-bold">{movie.title}</p>
                                                <span>&#183;</span>
                                                <p>{movie.release_date.slice(0, 4)}</p>
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        }
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme='gray' mr={3} onClick={onClose}>
                            Close
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

export default NavigatorSearch