'use client'

import { Button, Flex, Text } from "@radix-ui/themes"
import { useRouter, useSearchParams } from "next/navigation";
import { MdKeyboardDoubleArrowLeft, MdKeyboardDoubleArrowRight, MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";

interface Props {
    itemCount: number
    pageSize: number
    currentPage: number
}

const Pagination = ({ itemCount, pageSize, currentPage }: Props) => {
    const pageCount = Math.ceil(itemCount / pageSize)
    if (pageCount <= 1) return null

    const router = useRouter()
    const searchParams = useSearchParams()

    const changePage = (page: number) => {
        const params = new URLSearchParams(searchParams)
        params.set('page', page.toString())
        router.push('?' + params.toString())
    }

    return (
        <Flex my="8" justify="center" align="center" gap="2">
            <Button color="gray" variant="soft" onClick={() => changePage(1)} disabled={currentPage === 1}>
                <MdKeyboardDoubleArrowLeft />
            </Button>
            <Button color="gray" variant="soft" onClick={() => changePage(currentPage - 1)} disabled={currentPage === 1}>
                <MdKeyboardArrowLeft />
            </Button>
            <Text>
                Page {currentPage} of {pageCount}
            </Text>
            <Button color="gray" variant="soft" onClick={() => changePage(currentPage + 1)} disabled={currentPage === pageCount}>
                <MdKeyboardArrowRight />
            </Button>
            <Button color="gray" variant="soft" onClick={() => changePage(pageCount)} disabled={currentPage === pageCount}>
                <MdKeyboardDoubleArrowRight />
            </Button>
        </Flex>
    )
}

export default Pagination