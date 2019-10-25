import {GraphQL} from '@/api/Graphql';
import {graphqlClient} from '@/store/api';

interface PicrossQueryResult {
  picross: PicrossModel;
}

interface PicrossModel {
  id: string;
  map: string;
}

export class GqlPicross extends GraphQL {

  public static loadPicrossById(id: string) {
    const query = `{
        picross(id: "${id}") {
          id
          map
        }
      }`;

    return graphqlClient.request<PicrossQueryResult>(query);
  }


  public static loadRandomPicross() {
    const query = `{
        picross {
          id
          map
        }
      }`;

    return graphqlClient.request<PicrossQueryResult>(query);
  }

  public static savePicross(map: string) {
    const mutation = `
     mutation createPicross($map: String) {
        createPicross(map: $map) {
          id
        }
     }`;

    return graphqlClient.request<any>(mutation, {map});
  }

}
