<?php

declare(strict_types=1);

namespace App\Model;

use Hyperf\DbConnection\Model\Model;

/**
 * @property int $id 
 * @property string $code 
 * @property int $user_id 
 * @property int $mark_type 
 * @property string $mark_option 
 * @property int $created_time 
 * @property int $updated_time 
 */
class StockMark extends Model
{
    /**
     * The table associated with the model.
     */
    protected ?string $table = 'stock_mark';

    /**
     * The attributes that are mass assignable.
     */
    protected array $fillable = [];

    /**
     * The attributes that should be cast to native types.
     */
    protected array $casts = ['id' => 'integer', 'user_id' => 'integer', 'mark_type' => 'integer', 'created_time' => 'integer', 'updated_time' => 'integer'];
}
