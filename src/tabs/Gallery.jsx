import { Component, useState } from 'react';

import * as ImageService from 'service/image-service';
import { Button, SearchForm, Grid, GridItem, Text, CardItem } from 'components';
import { useEffect } from 'react';

// ===========ХУКИ===============

export const Gallery = () => {
  const [query, setQuery] = useState('');
  const [photos, setPhotos] = useState([]);
  const [pageQuery, setPage] = useState(1);
  const [isVisible, setVisible] = useState(false);
  const [isEmpty, setEmpty] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const addQuery = value => {
    setQuery(value);
    setPhotos([]);
    setPage(1);
    setVisible(false);
    setEmpty(false);
    setLoading(false);
    setError(null);
  };

  useEffect(() => {
    if (!query) {
      return;
    }

    const fetchImages = async () => {
      setLoading(true);
      try {
        const {
          page,
          per_page,
          photos: images,
          total_results,
        } = await ImageService.getImages(query, pageQuery);
        if (images.length === 0) {
          setEmpty(true);
        }

        setPhotos(prevState => [...prevState, ...images]);
        setVisible(page < Math.ceil(total_results / per_page));
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, [pageQuery, query]);

  const onLoadMore = () => {
    setPage(prevState => prevState + 1);
  };

  return (
    <>
      <SearchForm onSubmit={addQuery} />
      {photos.length > 0 && (
        <Grid>
          {photos.map(({ id, avg_color, alt, src }) => (
            <GridItem key={id}>
              <CardItem color={avg_color}>
                <img src={src.large} alt={alt} />
              </CardItem>
            </GridItem>
          ))}
        </Grid>
      )}

      {photos.length === 0 && (
        <Text textAlign="center">Sorry. There are no images ... 😭</Text>
      )}

      {isVisible && (
        <Button onClick={onLoadMore} disabled={isLoading}>
          {isLoading ? 'Loading...' : 'Load more'}
        </Button>
      )}
    </>
  );
};

// ===========КЛАСИ===============

// export class oldGallery extends Component {
//   state = {
//     query: '',
//     photos: [],
//     page: 1,
//     isVisible: false,
//     isEmpty: false,
//     isLoading: false,
//     error: null,
//   };

//   async componentDidUpdate(prevProps, prevState, snapshot) {
//     if (
//       this.state.query !== prevState.query ||
//       prevState.page !== this.state.page
//     ) {
//       this.setState({ isLoading: true });
//       try {
//         const { page, per_page, photos, total_results } =
//           await ImageService.getImages(this.state.query);
//         if (photos.length === 0) {
//           this.setState({ isEmpty: true });
//         }
//         this.setState(prevState => ({
//           photos: [...prevState.photos, ...photos],
//           isVisible: page < Math.ceil(total_results / per_page),
//         }));
//       } catch (error) {
//         this.setState({ error });
//       } finally {
//         this.setState({ isLoading: false });
//       }
//     }
//   }

//   addQuery = value => {
//     this.setState({
//       query: value,
//       photos: [],
//       page: 1,
//       isVisible: false,
//       isEmpty: false,
//       isLoading: false,
//       error: null,
//     });
//   };

//   onLoadMore = () => {
//     this.setState(prevState => ({ page: prevState.page + 1 }));
//   };

//   render() {
//     const { photos, isVisible, isLoading } = this.state;
//     return (
//       <>
//         <SearchForm onSubmit={this.addQuery} />
//         {photos.length > 0 && (
//           <Grid>
//             {photos.map(({ id, avg_color, alt, src }) => (
//               <GridItem key={id}>
//                 <CardItem color={avg_color}>
//                   <img src={src.large} alt={alt} />
//                 </CardItem>
//               </GridItem>
//             ))}
//           </Grid>
//         )}

//         {photos.length === 0 && (
//           <Text textAlign="center">Sorry. There are no images ... 😭</Text>
//         )}

//         {isVisible && (
//           <Button onClick={this.onLoadMore} disabled={isLoading}>
//             {isLoading ? 'Loading...' : 'Load more'}
//           </Button>
//         )}
//       </>
//     );
//   }
// }
