function Post({title, content, date}) {

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
      }

      function truncate(text, length) {
        if (text.length <= length) {
          return text;
        }
      
        return `${text.slice(0, length)}... read more`;
      }

    return (
        <div className="flex gap-2 text-center">
            <img className="w-2/4 object-cover" src="https://images.pexels.com/photos/8960464/pexels-photo-8960464.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"/>
            <div className="w-1/2 py-4">
                <h2 className="font-bold text-lg">{title}</h2>
                <p className="text-gray-300 text-xs">{formatDate(date)}</p>
                <p className="text-gray-600 text-sm">{truncate(content, 300)}</p>
            </div>
        </div>
    );
}

export default Post;