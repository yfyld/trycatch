import { ES_CONFIG } from './../../app.config';
import { ElasticsearchModule } from '@nestjs/elasticsearch';

export const EsModule = ElasticsearchModule.register(ES_CONFIG);
