export const getStaticPaths = async () => {
    const res = await fetch('https://khulo.gov.ge/api/news.php?lang=geo')
    const data = await res.json()

    const paths = Object.entries(data.სიახლეები).map((newsItem) => {
        // console.log(newsItem)
        return {
            params: {
                id: newsItem[1].geo.rec_id,
            },
        }
    })

    return {
        paths: paths,
        fallback: false,
    }
}

// export const getStaticProps = async (context) => {
//     const id = context.params.id
//     const res = await fetch('https://khulo.gov.ge/api/news.php?lang=geo' + id)
// }

export const getStaticProps = async () => {
    const res = await fetch('https://khulo.gov.ge/api/news.php?lang=geo')
    const data = await res.json()

    return {
        props: { news: data.სიახლეები },
    }
}

import { useRouter } from 'next/router'
import Head from 'next/head'
import Image from 'next/image'
import {
    FacebookShareButton,
    FacebookIcon,
    TwitterShareButton,
    TwitterIcon,
} from 'next-share'

const NewsArticle = ({ news }) => {
    const router = useRouter()
    const { id } = router.query

    const newsList = Object.entries(news)
    const newsItem = newsList.filter((news_id) => news_id[1].geo.rec_id == id.toString())
    const newsItemGeo = newsItem[0][1].geo

    const imagePath = 'https://khulo.gov.ge/' + newsItemGeo.img
    const url = 'https://khulo.gov.ge/' + newsItemGeo.rec_id

    // console.log(newsItem[0][1].geo)

    return (
        <article>
            <Head>
                <title>{newsItemGeo.title}</title>
                <meta name='description' content='აღწერა' key='desc' />
                <meta property='og:title' content={newsItemGeo.title} />
                <meta property='og:description' content='აღწერა' />
                <meta property='og:image' content={imagePath} />
                <meta property='og:type' content='website' />
                <meta property='fb:app_id' content='440924728203663' />
                <meta property='og:url' content={url} />
            </Head>
            <figure className={'image-container'}>
                <Image src={imagePath} alt={newsItemGeo.title} fill className={'image'} />
            </figure>
            <header>
                <time>{newsItemGeo.date}</time>
                <h1>{newsItemGeo.title}</h1>
            </header>
            <div>{newsItemGeo.text}</div>
            <FacebookShareButton url={url} quote={newsItemGeo.title}>
                <FacebookIcon size={32} round />
            </FacebookShareButton>
            <TwitterShareButton url={url} title={newsItemGeo.title}>
                <TwitterIcon size={32} round />
            </TwitterShareButton>
        </article>
    )
}

export default NewsArticle
