import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ImageEntity } from '../models/product/image.entity';
import { Repository } from 'typeorm';
import { Console } from 'console';

@Injectable()
export class ImageService {
  constructor(
    @InjectRepository(ImageEntity)
    private readonly imageRepository: Repository<ImageEntity>,
  ) {}

  async createProductImage(payload): Promise<object[]> {
    let alt = 'Sahari';
    if (typeof payload.alt !== 'undefined') {
      alt = payload.alt;
    }
    let arr = [];
    for (let i = 0; i < payload.images.length; i++) {
      let image = this.imageRepository.create({
        ...payload.images[i],
        product: payload,
      });
      arr.push(image);
    }

    let status = [];
    try {
      status = [
        {
          success: true,
          message: 'Success images created',
        },
      ];

      await this.imageRepository.save(arr);
    } catch (error) {
      status = [
        {
          success: false,
          message: "Error with images",
        },
      ];

      throw new HttpException(status, HttpStatus.NOT_ACCEPTABLE);
    }
    return status;
  }
}
