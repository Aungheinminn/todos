import Card from "../Card/Card"
type FriendSuggestionsProps = {
    items: [];
    onFollow: (id: string) => void;
    onRemove: (id: string) => void;
}

const FriendSuggestions:React.FC<FriendSuggestionsProps> = ({items, onFollow, onRemove}) => {
    return (
        <div className="w-full flex flex-col">
            <div className="w-full flex justify-start items-center">
                <p className="text-black font-bold">Friend suggestions</p>
            </div>
            <div className="w-full">
                <Card onFollow={onFollow} onRemove={onRemove} />
            </div>
        </div>
    )
}