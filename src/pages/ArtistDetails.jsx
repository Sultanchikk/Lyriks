import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { DetailsHeader, Error, Loader, RelatedSongs } from '../components';
import { useEffect } from 'react';
import { fetchArtist } from '../redux/features/playerSlice';

const ArtistDetails = () => {
  const dispatch = useDispatch();
  const { activeSong, isPlaying, artist } = useSelector((state) => state.player);
  const { id } = useParams();
  useEffect(() => {
    dispatch(fetchArtist(id));
  }, [id]);

  console.log('data', artist?.artistDetails);
  if (artist.status == 'loading') return <Loader title="Loading artists details..." />;

  if (artist.status == 'error') return <Error />;

  return (
    <div className="flex flex-col">
      <DetailsHeader artistId={id} artistData={artist?.artistDetails[0]} />
      {/* <RelatedSongs
        data={Object.values(artist?.artistDetails[0]?.attributes)}
        artistId={id}
        isPlaying={isPlaying}
        activeSong={activeSong}
      /> */}
      <div className="mb-10">
        <h2 className="text-white text-3xl font-bold">Artist Bio:</h2>

        <div className="mt-5">
          {artist.artistDetails[0].attributes.artistBio ? (
            <p className="text-gray-400 text-base my-1">
              {artist?.artistDetails[0].attributes.artistBio}
            </p>
          ) : (
            <p className="text-gray-400 text-base my-1">Sorry, no Artist Bio found!</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ArtistDetails;
