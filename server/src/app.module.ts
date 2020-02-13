import { BullQueueModule } from './providers/bull-queue/bull-queue.module';
import { HelperModule } from './providers/helper/helper.module';
import { SearchModule } from './modules/search/search.module';
import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { AppController } from './app.controller';
import { UserModule } from './modules/user/user.module';
import { ProjectModule } from './modules/project/project.module';
import { CommonModule } from './modules/common/common.module';
import { ErrorModule } from './modules/error/error.module';
import { CorsMiddleware } from './middlewares/cors.middleware';
import { DatabaseModule } from './providers/database/database.module';
import { PermissionsGuard } from './guards/permission.guard';
import { SlsModule } from './providers/sls/sls.module';

@Module({
  imports: [
    DatabaseModule,
    UserModule,
    ProjectModule,
    SearchModule,
    CommonModule,
    ErrorModule,
    HelperModule,
    BullQueueModule,
    SlsModule
  ],
  controllers: [AppController],
  providers: [PermissionsGuard],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CorsMiddleware).forRoutes('*');
  }
}
