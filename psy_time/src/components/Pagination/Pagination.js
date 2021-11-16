import React, {useState, useMemo, useEffect} from 'react';
import cn from 'classnames';
import styles from './Pagination.module.scss';


const Pagination = (props) => {
    const {pagesAmount, getPageData, needScrollToTop} = props
    let pagesAmountInViewport = props.pagesAmountInViewport || 5
    pagesAmountInViewport = pagesAmountInViewport < pagesAmount ? pagesAmountInViewport : pagesAmount
    const pageShift = pagesAmountInViewport / 2
    const pagesNumbers = useMemo(() => Array.from({length: pagesAmount}, (v, i) => i + 1), [pagesAmount])
    const [currentPageNumber, setCurrentPageNumber] = useState(1)
    const [pagesNumbersInViewport, setPagesNumbersInViewport] = useState([])
    const firstPageNumberInViewport = pagesNumbersInViewport[0]
    const lastPageNumberInViewport = pagesNumbersInViewport[pagesNumbersInViewport.length - 1]

    useEffect(() => {
        if(needScrollToTop) window.scrollTo(0, 0);
    }, [currentPageNumber, needScrollToTop]);

    useEffect(() => {
        setPagesNumbersInViewport(pagesNumbers.slice(0, pagesAmountInViewport))
    }, [pagesAmount, pagesNumbers, pagesAmountInViewport]);


    const onSelectPageClick = (e) => {
        let pageNumber = e.target.id || e.target.parentNode.id
        pageNumber = parseInt(pageNumber)
        getPageData({pageNumber})
        setCurrentPageNumber(pageNumber)

        if(pageNumber === lastPageNumberInViewport && pageNumber !== pagesNumbers.length) {
            let newPagesNumbers = pagesNumbers.slice(pageNumber - pageShift, pageNumber + pageShift)
            const newPagesNumbersAmount = newPagesNumbers.length

            if(newPagesNumbersAmount < pagesAmountInViewport){
                const pagesNeed = pagesAmountInViewport - newPagesNumbersAmount

                for(let i = 1; i <= pagesNeed; i++){
                    newPagesNumbers.unshift(newPagesNumbers[0] - i)
                }
            }
            setPagesNumbersInViewport(newPagesNumbers)

        }

        if(pageNumber === firstPageNumberInViewport && pageNumber !== 1) {
            const previousPagesFirstHalfNumbers = pageNumber - pageShift
            const fromPage = previousPagesFirstHalfNumbers >= 0 ? previousPagesFirstHalfNumbers : 0
            let newPagesNumbers = pagesNumbers.slice(fromPage, pageNumber + pageShift)

            const newPagesNumbersAmount = newPagesNumbers.length

            if(newPagesNumbersAmount < pagesAmountInViewport){
                const pagesNeed = pagesAmountInViewport - newPagesNumbersAmount

                for(let i = 1; i <= pagesNeed; i++){
                    newPagesNumbers.push(newPagesNumbers[newPagesNumbersAmount - 1] + i)
                }
            }
            setPagesNumbersInViewport(newPagesNumbers)
        }
    } 

    const onFirstPageClick = () => {
        getPageData({pageNumber: 1})
        setCurrentPageNumber(1)

        if(pagesAmountInViewport !== pagesAmount){
            setPagesNumbersInViewport(pagesNumbers.slice(0, pagesAmountInViewport))
        }
    }

    const onLastPageClick = () => { 
        getPageData({pageNumber: pagesAmount})
        setCurrentPageNumber(pagesAmount)

        
        if(pagesAmountInViewport !== pagesAmount){
            setPagesNumbersInViewport(pagesNumbers.slice(pagesNumbers.length - pagesAmountInViewport, pagesNumbers.length))
        }
    }
  
    return (
        <div className={styles.PageNumbers}>
            <div className={styles.PageNumbersFirst} onClick={onFirstPageClick}>
                <div></div>
                <div></div>
            </div>
            {firstPageNumberInViewport !== 1 &&
                <div className={styles.PageNumbersPreviousPages}>
                    <p>...</p>
                </div>
            }   
            {pagesNumbersInViewport.map(num => {
                const currentPageClassName = num === currentPageNumber 
                    ? cn(styles.PageNumbersNumber, styles.PageNumbersCurrent)
                    : styles.PageNumbersNumber

                return (
                    <div className={currentPageClassName} id={num} onClick={onSelectPageClick}>
                        <p>{num}</p>
                    </div>
                )
            })}
            {lastPageNumberInViewport !== pagesNumbers.length && 
                <div className={styles.PageNumbersNextPages}>
                    <p>...</p>
                </div>
            }
            <div className={styles.PageNumbersLast} onClick={onLastPageClick}>
                <div></div>
                <div></div>
            </div>
        </div>
    );
};

export default Pagination;