import TopicCard from "../TopicCard/TopicCard";

const TopicsBody = () => {
    return (
        <div className="w-full flex flex-col items-center gap-y-3">
            <TopicCard />
            <TopicCard />
            <TopicCard />
        </div>
    );
}
export default TopicsBody