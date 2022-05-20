import { validateUrl } from '../app/validators/UrlValidator';
import { generateShort, Url } from '../app/domain/models/Url';

import { Handler } from "../http/types";

export const AddUrl : Handler = async (request, response) => {
    if (!validateUrl(request.body.url)){
        response.status(400).send({'Error': 'Invalid body'});
        return;
    }

    const short = generateShort();
    const shortUrl = `https://pbid.io/${short}`;

    const url = new Url({
        url: request.body.url,
        short: shortUrl,
    });
    
    await url.save();

    response.send(url);
};

export const ListUrls : Handler = async (request, response) => {
    response.send(await Url.find());
};