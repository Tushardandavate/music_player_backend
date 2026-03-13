import axios from "axios";
const getSongs = async(req, res) => {
    try {
        const response = await axios.get(`https://api.jamendo.com/v3.0/tracks/?client_id=a56164c5&format=json&limit=15`);
        const data = response.data;
        res.status(200).json(data);
    } catch (error) {
        console.error(error.message)
        res.status(500).json({ message: error.message })
    }
};

const getPlaylistByTag = async(req, res) => {
    try {
        const tag = (req.params.tag || req.query.tag || "").toString().trim();
        if (!tag) return res.status(400).json({ message: "Missing Tag Parameters" });

        const limit = parseInt(
            req.query.limit !== undefined && req.query.limit !== null ?
            req.query.limit :
            "10",
            10
        );

        const clientId = "a56164c5";
        const params = {
            client_id: clientId,
            format: "jsonpretty",
            tags: tag,
            limit,
        };
        const response = await axios.get("https://api.jamendo.com/v3.0/tracks/", {
            params,
        });
        return res.status(200).json(response.data);
    } catch (error) {
        console.error(
            "getPlayListTag error",
            (error && error.response && error.response.data) || error.message
        );

        return res.status(500).json({ message: "Failed to fetch" });
    }
};

const toggleFavourite = async(req, res) => {
    try {
        const user = req.user;
        const song = req.body.song;

        const exists = user.favourites.some((fav) => fav.id === song.id);

        if (exists) {
            user.favourites = user.favourites.filter(
                (fav) => fav.id !== song.id
            );
        } else {
            user.favourites.push(song);
        }

        await user.save();
        return res.status(200).json(user.favourites);
    } catch (error) {
        console.error(error.message);
        return res.status(400).json({
            message: "Favourites not added, something went wrong",
        });
    }
};

export { getSongs, getPlaylistByTag, toggleFavourite };