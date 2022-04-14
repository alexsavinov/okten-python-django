import {Pagination} from "react-bootstrap";


const Paginator = ({param, setCurrentPage}) => {

    const {page_number, total_pages} = param;

    return (
        <Pagination className='m-0 justify-content-center'>
            <Pagination.First href='#' style={{color: 'black'}} onClick={() => setCurrentPage(1)}/>
            <Pagination.Prev href='#' disabled={page_number === 1} onClick={() => setCurrentPage(page_number - 1)}/>
            <Pagination.Item href='#'>{page_number}</Pagination.Item>
            <Pagination.Next href='#' disabled={page_number === total_pages}
                             onClick={() => setCurrentPage(page_number + 1)}/>
            <Pagination.Last href='#' onClick={() => setCurrentPage(total_pages)}/>
        </Pagination>
    );
}

export {Paginator};
