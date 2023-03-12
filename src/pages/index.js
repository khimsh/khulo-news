export const getStaticProps = async () => {
    const res = await fetch('https://khulo.gov.ge/api/news.php?lang=geo')
    const data = await res.json()

    return {
        props: { news: data.სიახლეები },
    }
}

import NewsCard from '@/components/NewsCard'

const News = ({ news }) => {
    const newsList = Object.entries(news)

    return (
        <div>
            <h1>სიახლეები</h1>
            <div className='news-grid'>
                {newsList.map((newsItem, i) => (
                    <NewsCard news={newsItem[1].geo} key={i} />
                ))}
            </div>
        </div>
    )
}

export default News
