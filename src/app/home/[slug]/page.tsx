const Home = ({params}: { params: { slug: string}}) => {

    return (
        <div className="pt-[50px] text-black">
            <h1>Home {params.slug}</h1>
        </div>
    )
}
export default Home

