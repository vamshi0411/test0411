import { 
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
    Query,
 } from '@nestjs/common';

@Controller('examples')
export class ExamplesController {


    @Post()
    async create(@Body('exampleName') exampleName: string) {
        console.log(`POST called post with ${exampleName}!`);

        return {
            ok: true,
            created: {
                exampleName
            }
        };
    }

    @Get()
    async retrieveQuery(@Query('exampleName') exampleName: string) {
        console.log(`GET called get with ${exampleName}`);

        return {
            ok: true,
            example: {
                exampleName
            }
        };
    }

    @Get(":exampleName")
    async retrieveParam(@Param('exampleName') exampleName: string) {
        console.log(`GET called get with ${exampleName}`);

        return {
            ok: true,
            example: {
                exampleName
            }
        };
    }

    @Put(':exampleName')
    async update(@Param('exampleName') exampleName: string, @Body('update') update: string) {
        console.log(`PUT called with ${exampleName} and with update: ${update}`);

        return {
            ok: true,
            example: {
                exampleName,
                update
            }
        };
    }

    @Delete(':exampleName')
    async remove(@Param('exampleName') exampleName: string) {
        console.log(`DELETE called with ${exampleName}`);

        return {
            ok: true,
            example: {
                exampleName
            }
        };
    }

}
