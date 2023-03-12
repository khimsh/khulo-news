import Image from 'next/image'
import Link from 'next/link'

const NewsCard = ({ news }) => {
    const imagePath = 'https://khulo.gov.ge/' + news.img
    const fullArticlePath = 'newslist/' + news.rec_id

    // console.log(news)

    return (
        <article className='card'>
            <figure className={'image-container'}>
                <Image src={imagePath} alt={news.title} fill className={'image'} />
            </figure>
            <header>
                <time>{news.date}</time>
                <h2>{news.title}</h2>
            </header>
            <Link href={fullArticlePath}>ვრცლად</Link>
        </article>
    )
}

export default NewsCard
